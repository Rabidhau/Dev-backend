const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cms",
});

module.exports = con;

// con.connect(function (err, conn) {
//   if (err) throw err;
//   else console.log("Connect");

//   con.query("SELECT * FROM courses", function (err, rows) {
//     if (err) throw err;
//     else console.log(rows[0].id);
//   });
// });
