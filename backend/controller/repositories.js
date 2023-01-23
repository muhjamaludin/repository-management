const models = require("../models/index");
const dataRepositories = require("../../data/repository.json");

module.exports = {
  getAllRepositories: async (req, res) => {
    try {
      const allRepositories = await models.getAllRepositories();
      const data = {
        message: "success get all repositories",
        data: allRepositories,
      };
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  },
  addRepository: async (req, res) => {
    try {
      const checkBody = rawBodyRepoValidation(req.body);
      if (checkBody.status != "oke") throw new Error(checkBody);

      const insertData = await models.addRepository(checkBody.body);
      console.log(insertData);
      if (insertData) {
        res.status(201).send({
          message: "success insert new repository",
        });
      }
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  },
  updateRepository: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await models.getRepoById(id);
      if (!checkId.length) throw new Error("repo not found!");

      const checkBody = rawBodyRepoValidation(req.body);
      if (checkBody.status != "oke") throw new Error(checkBody);
      checkBody.body.push(id);

      const updateData = await models.updateRepository(checkBody.body);
      if (updateData) {
        res.status(200).send({
          message: "success updating data",
        });
      }
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  },
  deleteRepository: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await models.getRepoById(id);
      if (!checkId.length) throw new Error("repo not found!");

      const updateData = await models.deleteRepository(id);
      if (updateData) {
        res.status(200).send({
          message: "success deleting data",
        });
      }
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  },
};

function rawBodyRepoValidation(body = {}) {
  const raws = ["name", "remote", "link", "publicity", "status", "description"];
  const remotes = dataRepositories.remotes;
  const publicities = dataRepositories.publicities;
  const status = dataRepositories.status;

  try {
    // validation all raw json must be declare on body
    for (let raw of raws) {
      if (!Object.keys(body).includes(raw))
        throw new Error(`${raw} is required!`);
    }

    // validation remote, publicity, and status match with data repositories
    if (!remotes.map((a) => String(a.id)).includes(body.remote))
      throw new Error("remote is not valid!");
    if (!publicities.map((a) => String(a.id)).includes(body.publicity))
      throw new Error("publicity is not valid!");
    if (!status.map((a) => String(a.id)).includes(body.status))
      throw new Error("status is not valid");

    // validation length to prevent inserting to many string
    if (!body.name.match(/^.{3,48}$/))
      throw new Error("name minimum 3 char and max 48");
    if (!body.link.match(/^.{0,100}$/))
      throw new Error("maximum length of link 99 char");
    if (!body.description.match(/^.{0,199}$/))
      throw new Error("description max length 199");

    const data = {
      status: "oke",
      body: [
        body.name,
        body.remote,
        body.link,
        body.publicity,
        body.status,
        body.description,
      ],
    };
    return data;
  } catch (err) {
    return err.message;
  }
}
