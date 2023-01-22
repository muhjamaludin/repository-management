const models = require("../models/index");

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
};
