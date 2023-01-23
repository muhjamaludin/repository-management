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
  getRepoById: (id) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${table} WHERE id = ?`;
      conn.query(sql, [id], (err, rows, fields) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },
  addRepository: (data = []) => {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO ${table} (name, remote, link, publicity, status, description) VALUES (?, ?, ?, ?, ?, ?);`;
      conn.query(sql, data, (err, rows, fields) => {
        if (err) reject(err);
        resolve(rows.affectedRows);
      });
    });
  },
  updateRepository: (data = []) => {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE ${table} SET name=?, remote=?, link=?, publicity=?, status=?, description=? WHERE id=?`;
      conn.query(sql, data, (err, rows, fields) => {
        if (err) reject(err);
        resolve(rows.affectedRows);
      });
    });
  },
  deleteRepository: (id) => {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM ${table} WHERE id = ?`;
      conn.query(sql, [id], (err, rows, fields) => {
        if (err) reject(err);
        resolve(rows.affectedRows);
      });
    });
  },
};
