const repository = require("express").Router();
const controller = require("../controller/index");

repository.get("/", controller.getAllRepositories);
repository.put("/", controller.addRepository);

module.exports = repository;
