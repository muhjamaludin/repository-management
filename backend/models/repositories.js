const { conn } = require("../config/db");

const table = "repositories";

module.exports = {
  getAllRepositories: (params = {}) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM ${table} WHERE 1+1`;

      const { newSql, sqlParams } = searchSortPagination(params);
      sql += newSql;

      conn.query(sql, sqlParams, (err, rows, fields) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },
  countRepositories: (params = {}) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT COUNT(*) AS total FROM ${table} WHERE 1+1`;

      const { newSql, sqlParams } = searchSortPagination(params);
      sql += newSql;

      conn.query(sql, sqlParams, (err, rows, fields) => {
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

function searchSortPagination(params) {
  const raws = [
    "id",
    "name",
    "remote",
    "link",
    "publicity",
    "status",
    "description",
  ];
  let sql = "";
  const sqlParams = [];

  // handling searching
  if (params.search.name) {
    sql += " AND name LIKE ?";
    sqlParams.push(`%${params.search.name}%`);
  }
  if (params.search.remote) {
    sql += " AND remote = ?";
    sqlParams.push(params.search.remote);
  }
  if (params.search.link) {
    sql += " AND link LIKE ?";
    sqlParams.push(`%${params.search.link}%`);
  }
  if (params.search.publicity) {
    sql += " AND publicity = ?";
    sqlParams.push(params.search.publicity);
  }
  if (params.search.status) {
    sql += " AND status = ?";
    sqlParams.push(params.search.status);
  }
  if (params.search.description) {
    sql += " AND description LIKE ?";
    sqlParams.push(`%${params.search.description}%`);
  }

  // handling sortir
  if (params.sort) {
    const sortKey = Object.keys(params.sort)[0];
    if (raws.includes(sortKey)) {
      sql += ` ORDER BY ${sortKey} ${
        params.sort[sortKey] == 1 ? "DESC" : "ASC"
      }`;
    }
  }

  // handling pagination
  if (params.perpage) {
    sql += " LIMIT ?";
    sqlParams.push(params.perpage);
  }
  if (params.page) {
    sql += " OFFSET ?";
    sqlParams.push((params.page - 1) * params.perpage);
  }

  return {
    newSql: sql,
    sqlParams,
  };
}
