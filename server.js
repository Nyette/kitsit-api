const dotenv = require("dotenv");

dotenv.config();

// Express

const express = require("express");

const app = express();

const cors = require("cors");

app.use(cors());

app.use(express.json());

// Routes

const indexHandler = require("./routes/index");

app.use("/", indexHandler);

const authHandler = require("./routes/auth");

app.use("/auth", authHandler);

app.listen(process.env.PORT, () => {
  console.log(`See your changes at http://localhost:${process.env.PORT}.`);
});

module.exports = app;