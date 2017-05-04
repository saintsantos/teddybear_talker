#! /usr/bin/env python2.7
import subprocess
import sqlite3
import sys
conn = sqlite3.connect('/home/edwin/git/school/cse453/teddy_bear_talker/database/bearfinal.db')

c = conn.cursor()

if (sys.argv[1] == "voice"):
    c.execute("Select * from voice where voice_id=%d" % int(sys.argv[2]))
    result = c.fetchone()
    path = result[2]
    subprocess.Popen(['mpg123', '-q', path]).wait()
elif (sys.argv[1] == "jingle"):
    c.execute("Select * from jingle where jingle_id=%d" % int(sys.argv[2]))
    result = c.fetchone()
    subprocess.Popen(['mpg123', '-q', result[2]]).wait()
elif (sys.argv[1] == "event"):
    c.execute("SELECT * from events inner join voice on voice.voice_id=events.voice_id inner join jingle on jingle.jingle_id=events.jingle_id where events.event_id=%d" % int(sys.argv[2]))
    result = c.fetchone()
    subprocess.Popen(['mpg123', '-q', result[12]]).wait()
    subprocess.Popen(['mpg123', '-q', result[8]]).wait()

else:
    print "Please specify either event, voice, or jingle"
