import subprocess
import sqlite3
import sys
conn = sqlite3.connect('/home/edwin/git/school/cse453/teddy_bear_talker/database/bearfinal.db')

c = conn.cursor()
c.execute("Select * from active")
result = c.fetchone()
#print result
event = result[0]
c.execute("SELECT * from events inner join voice on voice.voice_id=events.voice_id inner join jingle on jingle.jingle_id=events.jingle_id where events.event_id=%d" % event)
result = c.fetchone()
#print result
voice_path = result[8]
jingle_path = result[12]
subprocess.Popen(['mpg123', '-q', jingle_path]).wait()
subprocess.Popen(['mpg123', '-q', voice_path]).wait()
