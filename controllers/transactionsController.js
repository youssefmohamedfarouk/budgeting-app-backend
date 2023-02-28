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
  const indexOfSingleTransaction = transactionsArr.findIndex(
    (e) => e.id === req.params.id
  );
  if (indexOfSingleTransaction !== -1) {
    const removedtransaction = transactionsArr.splice(
      indexOfSingleTransaction,
      1
    )[0];
    res.status(200).json(removedtransaction);
  } else {
    res.status(404).json({ error: "Transaction not found" });
  }
});

// UPDATE
transactions.put("/:id", validation, (req, res) => {
  const indexOfSingleTransaction = transactionsArr.findIndex(
    (e) => e.id === req.params.id
  );
  if (indexOfSingleTransaction !== -1) {
    transactionsArr[indexOfSingleTransaction] = req.body;
    res.status(200).json(transactionsArr[indexOfSingleTransaction]);
  } else {
    res.status(404).json({ error: "Transaction not found" });
  }
});

module.exports = transactions;
