require("dotenv").config();
const express = require("express");
const { repository } = require("../backend/migrations/index");

const PORT = process.env.APP_PORT || 9011;
const app = express();

app.use(express.json());

app.post("/schema/migrations", async (req, res) => {
  try {
    if (!req.body) throw new Error("raw body must be set!");
    const { migration_key } = req.body;
    if (migration_key != process.env.MIGRATION_KEY)
      throw new Error("Migration key failed");

    const repo = await repository();
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
});

app.use("*", (req, res) => {
  res.status(404).send({
    message: "Not Found!",
  });
});

app.listen(PORT, () => {
  console.log("Server listen on localhost:" + PORT);
});
