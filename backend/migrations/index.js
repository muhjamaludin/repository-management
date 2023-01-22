const { conn } = require("../config/db");

const db_name = process.env.DB_NAME;
const table = "repositories";

module.exports = {
  repository: () => {
    return new Promise((resolve, reject) => {
      const sql = `
        CREATE TABLE IF NOT EXISTS ${table}(
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
  checkCreatedAt: () => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT COUNT(*) AS total FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE table_name = '${table}' 
        AND table_schema = '${db_name}' 
        AND column_name = 'createdAt';
      `;
      conn.query(sql, (err, rows, fields) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },
  addCreatedAt: () => {
    return new Promise((resolve, reject) => {
      const sql = `ALTER TABLE ${table} ADD createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP();`;
      conn.query(sql, (err, rows, fields) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },
  checkNameAndLink: () => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT COUNT(*) AS total FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE table_name = '${table}' 
        AND table_schema = '${db_name}' 
        AND column_name = 'name' OR column_name = 'link';
      `;
      conn.query(sql, (err, rows, fields) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },
  addNameAndLink: () => {
    return new Promise((resolve, reject) => {
      const sql = `
        ALTER TABLE ${table}
        ADD COLUMN name VARCHAR(50) NOT NULL AFTER id,
        ADD COLUMN link VARCHAR(100) AFTER remote
      `;
      conn.query(sql, (err, rows, fields) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  },
};
