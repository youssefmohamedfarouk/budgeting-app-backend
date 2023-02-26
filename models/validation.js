const validation = (req, res, next) => {
  // console.log(req.body);
  // console.log(typeof req.body.date);
  // console.log(typeof req.body.item_name);
  // console.log(typeof req.body.amount);
  // console.log(typeof req.body.from);
  // console.log(typeof req.body.category);

  if (
    typeof req.body.date === "string" &&
    typeof req.body.item_name === "string" &&
    typeof Number(req.body.amount) === "number" &&
    typeof req.body.from === "string" &&
    typeof req.body.category === "string"
  ) {
    next();
  } else {
    res.status(406).json({
      error:
        "Invalid data entered - please fill out all expenditure information properly",
      date: typeof req.body.date,
      item_name: typeof req.body.item_name,
      amount: typeof req.body.amount,
      from: typeof req.body.from,
      category: typeof req.body.category,
    });
  }
};

module.exports = { validation };
