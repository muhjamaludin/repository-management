const repository = require("express").Router();
const controller = require("../controller/index");

repository.get("/", controller.getAllRepositories);
repository.put("/", controller.addRepository);
repository.post("/:id", controller.updateRepository);
repository.delete("/:id", controller.deleteRepository);

module.exports = repository;
