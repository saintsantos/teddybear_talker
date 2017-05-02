import sqlite3
import sys
conn = sqlite3.connect('/home/edwin/git/school/cse453/teddy_bear_talker/database/bearfinal.db')

c = conn.cursor()

if (sys.argv[1] == "voice"):
    c.execute("Select * from voice where voice_id=%d" % int(sys.argv[2]))
    result = c.fetchone()
    print result
elif (sys.argv[1] == "jingle"):
    c.execute("Select * from jingle where jingle_id=%d" % int(sys.argv[2]))
    result = c.fetchone()
    print result
elif (sys.argv[1] == "event"):
    c.execute("Select * from events where event_id=%d" % int(sys.argv[2]))
    result = c.fetchone()
    print result
else:
    print "Please specify either event, voice, or jingle"
