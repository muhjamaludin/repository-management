const { conn } = require("../config/db");

const table = "repositories";

module.exports = {
  getAllRepositories: (data = {}) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM ${table}
      `;
      conn.query(sql, data, (err, rows, fields) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },
  addRepository: (data = []) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO repositories (name, remote, link, publicity, status, description) VALUES (?, ?, ?, ?, ?, ?);`;
      conn.query(sql, data, (err, rows, fields) => {
        if (err) reject(err);
        resolve(rows.affectedRows);
      });
    });
  },
};
