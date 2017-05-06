#!/usr/bin/env python


# Modified by Steven Siwinski for use in UB's 'Teddy Bear Talker'. AKA:'Project Irie'

import time
import os
import subprocess
import sqlite3
import sys
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
DEBUG = 1

# Written by Limor "Ladyada" Fried for Adafruit Industries, (c) 2015
# This code is released into the public domain
# read SPI data from MCP3008 chip, 8 possible adc's (0 thru 7)
def readadc(adcnum, clockpin, mosipin, misopin, cspin):
        if ((adcnum > 7) or (adcnum < 0)):
                return -1
        GPIO.output(cspin, True)

        GPIO.output(clockpin, False)  # start clock low
        GPIO.output(cspin, False)     # bring CS low

        commandout = adcnum
        commandout |= 0x18  # start bit + single-ended bit
        commandout <<= 3    # we only need to send 5 bits here
        for i in range(5):
                if (commandout & 0x80):
                        GPIO.output(mosipin, True)
                else:
                        GPIO.output(mosipin, False)
                commandout <<= 1
                GPIO.output(clockpin, True)
                GPIO.output(clockpin, False)

        adcout = 0
        # read in one empty bit, one null bit and 10 ADC bits
        for i in range(12):
                GPIO.output(clockpin, True)
                GPIO.output(clockpin, False)
                adcout <<= 1
                if (GPIO.input(misopin)):
                        adcout |= 0x1

        GPIO.output(cspin, True)

        adcout >>= 1       # first bit is 'null' so drop it
        return adcout

# change these as desired - they're the pins connected from the
# SPI port on the ADC to the Cobbler
SPICLK = 18
SPIMISO = 23
SPIMOSI = 24
SPICS = 25

# set up the SPI interface pins
GPIO.setup(SPIMOSI, GPIO.OUT)
GPIO.setup(SPIMISO, GPIO.IN)
GPIO.setup(SPICLK, GPIO.OUT)
GPIO.setup(SPICS, GPIO.OUT)

# establish connection to database
conn = sqlite3.connect('/home/pi/teddybear_talker/database/bearfinal.db')
c = conn.cursor()

# Flex sensor connected to adc #0
flex_sensor_adc = 0;

last_read = 0       # this keeps track of the last flex_sensor value
tolerance = 80       # to keep from being jittery we'll only change
                    # volume when the pot has moved more than 80 'counts'
                    # probably going to need to adjust this once the sensor is in the bear

while True:

        # we'll assume that the pot didn't move
        flex_sensor_changed = False

        # read the analog pin
        flex = readadc(flex_sensor_adc, SPICLK, SPIMOSI, SPIMISO, SPICS)
        # how much has it changed since the last read?
        flex_diff = flex - last_read
        # sound_path = 'love.mp3'
        if DEBUG:
                print "flex:", flex
                print "flex_diff:", flex_diff
                print "last_read", last_read

        if ( flex_diff > tolerance ):
                flex_sensor_changed = True

        if DEBUG:
                print "flex_sensor_changed", flex_sensor_changed

        if ( flex_sensor_changed ):
                # fetch query from server
                c.execute("Select * from active")
                result = c.fetchone()
                print result
                event = result[0]
                c.execute("SELECT * from events inner join voice on voice.voice_id=events.voice_id inner join jingle on jingle.jingle_id=events.jingle_id where events.event_id=%d" % event)
                result = c.fetchone()
                print result
                voice_path = result[8]
                jingle_path = result[12]
                if jingle_path != "None":
                    subprocess.Popen(['mpg123', '-q', jingle_path]).wait()
                if voice_path != "None":
                    subprocess.Popen(['mpg123', '-q', voice_path]).wait()

        # save the potentiometer reading for the next loop
        last_read = flex

        # hang out and do nothing for a half second
        time.sleep(0.5)
