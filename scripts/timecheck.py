import datetime
import time

while(1):
    now = datetime.datetime.now()
    print(now.hour, now.minute)
    time.sleep(60)

