const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')

const DBSOURCE = "db.sqlite"

const db = new sqlite3.Database(DBSOURCE, (err: Error) => {
  if (err) {
    // Cannot open database
    console.error(err.message)
    throw err
  }else{
    console.log('Connected to the SQLite database.')
    db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
      (err: Error) => {
        if (err) {
          // Table already created
          //console.log(err)
        }else{
          // Table just created, creating some rows
          const insert = 'INSERT INTO user (name, email, password) VALUES (?,?,?)'
          db.run(insert, ["admin","admin@example.com",md5("admin123456")])
          db.run(insert, ["user","user@example.com",md5("user123456")])
        }
      });
    db.run(`CREATE TABLE movies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text, 
            genre text, 
            description text, 
            actors text,
            year text,
            trialUrl text,
            filePath text
            )`,
      (err: Error) => {
        if (err) {
          // Table already created
          //console.log(err)
        }else{
          // Table just created, creating some rows
          const insert = 'INSERT INTO movies (title, genre, description, actors, year, trialUrl) VALUES (?,?,?,?,?,?)'
          db.run(insert, [
            "The Shawshank Redemption",
            "drama",
            "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
            "Tim Robbins, Morgan Freeman, Bob Gunton",
            "1994",
            "https://youtu.be/PLl99DlL6b4"
          ])
        }
      });
  }
});


export default db;