import sqlite3
con = sqlite3.connect('db.sqlite')
cur = con.cursor()
cur.execute('''CREATE TABLE IF NOT EXISTS Users (
                uid INTEGER,
                balance INTEGER
            )''')
con.commit()
def add_user(uid):
    # new user always has balance = 0
    cur.execute(f'INSERT INTO Users VALUES ({uid}, 0)')
    con.commit()
  
