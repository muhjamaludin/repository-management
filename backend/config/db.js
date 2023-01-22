const mysql = require("mysql");
const conn = mysql.createConnection(process.env.DATABASE_URL);

// conn.query("SELECT 1 + 1 AS solution", (err, rows, fields) => {
//   if (err) throw err;
// console.log(rows);
// });

module.exports = {
  conn,
};
