from datetime import datetime
from sys import argv
from subprocess import call
import sqlite3

def get_recent_event(conn):
  c = conn.cursor()
  day = datetime.today().weekday()
  weekday = {
    0: "monday",
    1: "tuesday",
    2: "wednesday",
    3: "thursday",
    4: "friday",
    5: "saturday",
    6: "sunday"
  }
  day = weekday[day]
  print day
  events = []
  current = datetime.now()
  currentTime = current.time()

  for row in c.execute("select * from events where events.day='%s' order by time(time) desc" % day):
      events.append(row)
  print events
  for x in events:
      #print x
      timestring = x[1] + ':59'
      eventtime = datetime.strptime(timestring, "%H:%M:%S")
      print eventtime.time() <= currentTime
      if eventtime.time() <= currentTime:
          c.execute("select * from active")
          active = c.fetchone()
          print x
          if active == None:
              print "active empty"
              c.execute("insert into active (event_id) values (%d)" % x[0])
          else:
              print "active not empty"
              c.execute("UPDATE active set event_id=%d" % x[0])
          conn.commit()
          break

def play_event(conn):
    # fetch query from server
    c = conn.cursor()
    c.execute("Select event_id from active")
    result = c.fetchone()
    print result
    event = result[0]
    c.execute("SELECT * from events inner join audio as voice on voice.id=events.voice inner join audio as music on music.id=events.music where events.id=%d" % event)
    result = c.fetchone()
    print result
    voice_path = result[7]
    music_path = result[11]
    if music_path != "None":
        call(['mplayer', music_path])
    if voice_path != "None":
        call(['mplayer', voice_path])

def main(argv):
  conn = sqlite3.connect('/Users/edwinsantos/git/personal/teddybear_talker/server/python/python.db')
  get_recent_event(conn)
  play_event(conn)
  
if __name__ == '__main__':
  main(argv)
