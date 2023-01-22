const repository = require("express").Router();
const controller = require("../controller/index");

repository.get("/", controller.getAllRepositories);

module.exports = repository;
