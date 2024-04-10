const express = require('express');
const bodyParser = require('body-parser');
const conn = require('./db/connection'); // Importing connection as 'conn'
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post('/Login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE username=? AND password=?';
  const values = [username, password];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).send('Error logging in');
    } else if (result.length === 0) {
      res.status(401).send('Invalid credentials');
    } else {
      console.log('Login successful');
      res.status(200).send('Login successful');
    }
  });
});

// Signup Endpoint
app.post('/Signup', (req, res) => {
  const { username, password, email, role } = req.body;

  const sql = 'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)';
  const values = [username, password, email, role];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error signing up:', err);
      res.status(500).send('Error signing up');
    } else {
      console.log('Signup successful');
      res.status(200).send('Signup successful');
    }
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
