const { checkCreatedAt, repository, addCreatedAt } = require("./index");

module.exports = {
  migrate: async (req, res) => {
    try {
      if (!req.body) throw new Error("raw body must be set!");
      const { migration_key } = req.body;
      if (migration_key != process.env.MIGRATION_KEY)
        throw new Error("Migration key failed");

      const repo = await repository();
      const checkCreated = await checkCreatedAt();
      if (!checkCreated[0].total) {
        await addCreatedAt();
      }
      if (repo) {
        res.status(201).send({
          message: "Migrations success",
        });
      }
    } catch (err) {
      res.status(400).send({
        message: err.message,
      });
    }
  },
};
