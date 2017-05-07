import sqlite3
conn = sqlite3.connect('/home/edwin/git/school/cse453/teddy_bear_talker/database/bearfinal.db')

c = conn.cursor()

c.execute('SELECT * from active')
result = c.fetchone()

#The query of the currently active event
c.execute("SELECT * from events where event_id=%d" % result[0])
event = c.fetchone()
jingle_id = event[3]
voice_id = event[2]

#The queries to find the sounds for each event
c.execute("SELECT * from voice where voice_id=%d" % voice_id)
voice_result = c.fetchone()
c.execute("SELECT * from jingle where jingle_id=%d" % jingle_id)
jingle_result = c.fetchone()

#Checking and handling if a jingle or voice event exist
voice = None
jingle = None
if (voice_result[2] == "none"):
    voice = "No Voice"
else:
    voice = voice_result[2]
if (jingle_result[2] == "none"):
    jingle = "No Jingle"
else:
    jingle = jingle_result[2]

print "Voice Path: " + voice
print "Jingle Path: " + jingle
