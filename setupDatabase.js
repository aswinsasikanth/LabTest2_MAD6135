const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

// Middleware to parse POST data
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const db = new sqlite3.Database('./school.db'); 
// {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Connected to the in-memory SQlite database.');
// });

// Create table
db.run('CREATE TABLE user_data (name TEXT, email TEXT)', (err) => {
    if (err) {
      return console.error(err.message);
    }
  });
  
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    db.run(`INSERT INTO user_data(name, email) VALUES(?, ?)`, [name, email], (err) => {
      if (err) {
        return console.error(err.message);
      }
      res.send('Data saved successfully!');
    });
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

const sqlite3 = require('sqlite3').verbose();

// Open a database handle
const db = new sqlite3.Database('./school.db');

db.serialize(() => {
    // Create a new table
    db.run("CREATE TABLE students (id INT, name TEXT)");

    console.log("Table created successfully!");
});

db.close();