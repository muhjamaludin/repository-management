const migrate = require("express").Router();
const migrateController = require("./controller");

migrate.post("/", migrateController.migrate);

module.exports = migrate;
