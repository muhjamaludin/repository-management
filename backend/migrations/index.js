const { conn } = require("../config/db");

module.exports = {
  repository: () => {
    return new Promise((resolve, reject) => {
      const sql = `
        CREATE TABLE IF NOT EXISTS repositories(
          id SMALLINT PRIMARY KEY AUTO_INCREMENT,
          remote TINYINT,
          publicity TINYINT,
          status TINYINT,
          description VARCHAR(200)
        );
      `;
      conn.query(sql, (err, rows, fields) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },
};
