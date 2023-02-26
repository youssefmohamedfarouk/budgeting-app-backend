// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.use(express.json());
// app.use(cors());

// app.use((req, res, next) => {
//   console.log("App middleware");
//   next();
// });

const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to DOSH!");
});

// TRANSACTIONS ROUTES
const transactionsController = require("./controllers/transactionsController");
app.use("/transactions", transactionsController);

app.get("*", (req, res) => {
  res.status(404).json({ error: "Sorry, page not found" });
});

module.exports = app;
