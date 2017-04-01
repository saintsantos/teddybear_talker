import mysql.connector

connection = mysql.connector.connect(user='root', password='new-password', host='127.0.0.1', database='dev_teddybear_talker')

try:
    cursor = connection.cursor()
    cursor.execute("""
        select * from monday
    """)
    result = cursor.fetchall()
    print(result)
finally:
    connection.close()
