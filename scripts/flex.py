#!/usr/bin/env python -p


# Modified by Steven Siwinski and Edwin Santos for use in UB's 'Teddy Bear Talker'. AKA:'Project Irie'

import time
import subprocess
import sqlite3
import RPi.GPIO as GPIO
from datetime import datetime

GPIO.setmode(GPIO.BCM)
DEBUG = 1

root = '/home/pi/teddybear_talker/'
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

#define BCM pin 3 as the pin the power switch is attached to
#and BCM pin 16 as the pin the status LED is attached to
POWSW = 3
LEDPIN = 16


# set up the SPI interface pins
GPIO.setup(SPIMOSI, GPIO.OUT)
GPIO.setup(SPIMISO, GPIO.IN)
GPIO.setup(SPICLK, GPIO.OUT)
GPIO.setup(SPICS, GPIO.OUT)
GPIO.setup(19, GPIO.IN)

#set up the power switch pin to use the internal pull up resistor
GPIO.setup(POWSW,GPIO.IN,GPIO.PUD_UP)

#set the LED pin to output
GPIO.setup(LEDPIN,GPIO.OUT)

last_wifi = 'down\n'
# establish connection to database
conn = sqlite3.connect(root + '/server/python/python.db')
c = conn.cursor()

weekday = {
    0: "monday",
    1: "tuesday",
    2: "wednesday",
    3: "thursday",
    4: "friday",
    5: "saturday",
    6: "sunday"
  }

def getrecentevent():
    c = conn.cursor()
    day = datetime.today().weekday()
    if DEBUG:
        print day
    events = []
    current = datetime.now()
    currentTime = current.time()
    
    while not events:
        for row in c.execute("select * from events order by time(time) desc"):
            events.append(row)
            if DEBUG:
                print events
                print day
                print weekday[day]
            if not events:
                day -= 1
    for x in events:
        if DEBUG:
            print x
        timestring = x[1] + ':59'
        eventtime = datetime.strptime(timestring, "%H:%M:%S")
        if DEBUG:
            print eventtime.time() <= currentTime
        if eventtime.time() <= currentTime:
            c.execute("select * from active")
            active = c.fetchone()
            if DEBUG:
                print x
            if active == None:
                if DEBUG:
                    print "active empty"
                c.execute("insert into active (event_id) values (%d)" % x[0])
            else:
                if DEBUG:
                    print "active not empty"
                c.execute("UPDATE active set event_id=%d" % x[0])
        conn.commit()
        break

def play_event():
    c = conn.cursor()
    c.execute("Select event_id from active")
    result = c.fetchone()
    if DEBUG:
        print result
    event = result[0]
    c.execute("SELECT * from events inner join audio as voice on voice.id=events.voice inner join audio as music on music.id=events.music where events.id=%d" % event)
    result = c.fetchone()
    if DEBUG:
        print result
    voice_path = result[7]
    music_path = result[11]
    if music_path != "None":
        subprocess.call(['/usr/bin/omxplayer', music_path])
    if voice_path != "None":
        subprocess.call(['/usr/bin/omxplayer', voice_path])
    

# Flex sensor connected to adc #0
flex_sensor_adc = 0;

last_read = 650       # this keeps track of the last flex_sensor value
last_read2 = 650
last_force = 650
tolerance = 50       # to keep from being jittery we'll only change
                    # volume when the pot has moved more than 80 'counts'
                    # probably going to need to adjust this once the sensor is in the bear

while True:
    GPIO.output(LEDPIN, 1)
    power_switch = GPIO.input(POWSW)
    
    if power_switch == 0:
        #fall in here when the power putton is held down
        #play a "goodnight" sound
        subprocess.call(['/usr/bin/omxplayer', root + 'scripts/goodbye.mp3'], False)
        #call shutdown
        #this is a dirty way of doing it, think of fixing in the future
        subprocess.call(['sudo','shutdown','-h','now'],False)

    # we'll assume that the sensor is not triggered
    flex_sensor_changed = False

    # Read first chest sensor
    flex1 = readadc(flex_sensor_adc, SPICLK, SPIMOSI, SPIMISO, SPICS)
    # Read second chest sensor
    flex2 = readadc(1, SPICLK, SPIMOSI, SPIMISO, SPICS)
    # Read nose sensor
    force = readadc(2, SPICLK, SPIMOSI, SPIMISO, SPICS)


    # how much has it changed since the last read?
    flex_diff = flex1 - last_read

    flex_diff2 = flex2 - last_read2

    force_diff = force - last_force

    if DEBUG:
        print "flex:", flex1
        print "flex2", flex2
        print "force", force
        print "flex_diff:", flex_diff
        print "flex_diff2:", flex_diff2
        print "force_diff:", force_diff
        print "last_read", last_read
        print "last_read2", last_read2
        print "last_force", last_force

    if ( (flex_diff > tolerance) or (flex_diff2 > tolerance) ):
        flex_sensor_changed = True

        if DEBUG:
            print "flex_sensor_changed", flex_sensor_changed

    if ( flex_sensor_changed ):
        # fetch query from server
        getrecentevent()
        play_event()

    if ( force_diff > 80 ):	#the 60 is the tolerence for the nose sensor
        subprocess.Popen(['/usr/bin/omxplayer', root + 'scripts/nose.mp3'])

    # save the potentiometer reading for the next loop
    last_read = flex1
    last_read2 = flex2
    last_force = force

    # hang out and do nothing for a half second
    time.sleep(0.2)
