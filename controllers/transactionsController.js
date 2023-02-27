const express = require("express");
const transactions = express.Router();
const transactionsArr = require("../models/transactions");
const { validation } = require("../models/validation");

// -- index --
transactions.get("/", (req, res) => {
  res.json(transactionsArr);
});

// -- show --
transactions.get("/:id", (req, res) => {
  const { id } = req.params;
  const indexOfTransaction = transactionsArr.findIndex((e) => {
    return e.id === id;
  });
  console.log(indexOfTransaction);
  transactionsArr[indexOfTransaction] !== -1
    ? res.json(transactionsArr[indexOfTransaction])
    : res.status(404).json({ error: "Transaction not found" });
});

// -- create --
transactions.post("/", validation, (req, res) => {
  transactionsArr.push(req.body);
  res.json(req.body);
  // res.json(transactionsArr[transactionsArr.length - 1]);
});

// -- delete --
transactions.delete("/:id", (req, res) => {
  if (transactionsArr[req.params.id]) {
    const removedtransaction = transactionsArr.splice(req.params.id, 1);
    res.status(200).json(removedtransaction);
  } else {
    res.status(404).json({ error: "Transaction not found" });
  }
});

// UPDATE
transactions.put("/:id", validation, (req, res) => {
  if (transactionsArr[req.params.id]) {
    transactionsArr[req.params.id] = req.body;
    res.status(200).json(transactionsArr);
  } else {
    res.status(404).json({ error: "Transaction not found" });
  }
});

module.exports = transactions;
