const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./school.db');

// Insert data
db.serialize(() => {
    const stmt = db.prepare("INSERT INTO students VALUES (?, ?)");
    stmt.run(1, 'Aswin Sasikanth');
    stmt.run(2, 'Raghu Ram');
    stmt.run(3, 'Pradeep Koneru');
    stmt.run(4, 'Kalyan Boppna');
    stmt.run(5, 'Jagadeesh M');
    stmt.run(6, 'John Doe raj');
    stmt.finalize();

    // Retrieve data
    db.each("SELECT id, name FROM students", (err, row) => {
        console.log(`ID: ${row.id}, Name: ${row.name}`);
    });
});

db.close();