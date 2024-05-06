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

      // Create the "Users" table if it doesn't exist
      con.query(`CREATE TABLE IF NOT EXISTS Users (
        userId VARCHAR(100) NOT NULL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL
      )`, (err) => {
        if (err) {
          console.error('Error creating Users table:', err);
          throw err;
        }
        console.log('Table "Users" created or exists');
      });

      // Create the "joblisting" table if it doesn't exist
      con.query(`CREATE TABLE IF NOT EXISTS joblisting (
        id VARCHAR(255) NOT NULL,
        companyName VARCHAR(255) NOT NULL,
        jobTitle VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        emailAddress VARCHAR(255) NOT NULL,
        requirement1 VARCHAR(255) NOT NULL,
        requirement2 VARCHAR(255) NOT NULL,
        requirement3 VARCHAR(255) NOT NULL,
        requirement4 VARCHAR(255) NOT NULL,
        jobDetails TEXT NOT NULL,
        submitBy DATE NOT NULL,
        category VARCHAR(255) NOT NULL
      )`, (err) => {
        if (err) {
          console.error('Error creating joblisting table:', err);
          throw err;
        }
        console.log('Table "joblisting" created or exists');
      });
    });
  });
});

module.exports = con;
