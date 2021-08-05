const dotenv = require("dotenv");

dotenv.config();

// Express

const express = require("express");

const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());

// Routes

const authHandler = require("./auth");

app.use("/", authHandler);

app.listen(process.env.PORT, () => {
  console.log(`See your changes at http://localhost:${process.env.PORT}.`);
});

module.exports = app;