#! /usr/bin/env python2.7
import sqlite3
import time
conn = sqlite3.connect('/home/edwin/git/school/cse453/teddy_bear_talker/database/bearfinal.db')

c = conn.cursor()

result = time.localtime(time.time())
#print result[3]
#print result[4]
#timestring = str(result[3]) + ':' + str(result[4])
timestring = "11:10"
c.execute("SELECT * from events where events.timeDay='%s'" % timestring)
query = c.fetchone()
#print query
if query != None:
    event_id = query[0]
    c.execute("UPDATE active set active_id=%d" % event_id)
    c.execute("SELECT * from active")
    new_query = c.fetchone()
    print new_query[0]
