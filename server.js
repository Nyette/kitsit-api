const dotenv = require("dotenv");

dotenv.config();

// Express

const express = require("express");

const app = express();

// CORS

const cors = require("cors");

const corsOptions = {
	origin: true,
	credentials: true,
	allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

// JSON

app.use(express.json());

// Routes

const indexHandler = require("./routes/index");

app.use("/", indexHandler);

const catsHandler = require("./routes/cats");

app.use("/cats", catsHandler);

// const authHandler = require("./routes/auth");

// app.use("/auth", authHandler);

app.listen(process.env.PORT, () => {
	console.log(`See your changes at http://localhost:${process.env.PORT}.`);
});

module.exports = app;