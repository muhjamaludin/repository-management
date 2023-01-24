require("dotenv").config();
const express = require("express");
const cors = require("cors");
const migrate = require("./migrations/Routes");
const repo = require("./routes/repositories");

const PORT = process.env.APP_PORT || 9011;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/schema/migrations", migrate);
app.use("/api/repositories", repo);

app.use("*", (req, res) => {
  res.status(404).send({
    message: "Not Found!",
  });
});

app.listen(PORT, () => {
  console.log("Server listen on localhost:" + PORT);
});
