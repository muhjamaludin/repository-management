const { conn } = require("../config/db");

const table = "repositories";

module.exports = {
  getAllRepositories: (data = {}) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT * FROM ${table}
      `;
      conn.query(sql, (err, rows, fields) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },
};
