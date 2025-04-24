const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE data (id INT, name TEXT)");

    const stmt = db.prepare("INSERT INTO data VALUES (?, ?)");
    stmt.run(1, "John");
    stmt.run(2, "Jane");
    stmt.finalize();
});

function getData() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM data", (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

function addData(name) {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO data (name) VALUES (?)", [name], (err) => {
            if (err) reject(err);
            resolve();
        });
    });
}

module.exports = { getData, addData };
