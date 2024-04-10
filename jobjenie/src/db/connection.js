const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",

});

con.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL');

  // Check if the database exists, if not, create it
  con.query("CREATE DATABASE IF NOT EXISTS jobgenie", (err) => {
    if (err) {
      console.error('Error creating database:', err);
      throw err;
    }
    console.log('Database "jobgenie" created or exists');

    // Use the "jobgenie" database
    con.query("USE jobgenie", (err) => {
      if (err) {
        console.error('Error using database:', err);
        throw err;
      }
      console.log('Using database "jobgenie"');

      // Create the "users" table if it doesn't exist
      con.query(`CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') NOT NULL
      )`, (err) => {
        if (err) {
          console.error('Error creating table:', err);
          throw err;
        }
        console.log('Table "users" created or exists');
      });
    });
  });
});

module.exports = con;
