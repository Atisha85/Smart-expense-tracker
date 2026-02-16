const router = require("express").Router();
const Transaction = require("../models/Transaction");


// GET Transactions
router.get("/", async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});


// ADD Transaction
router.post("/", async (req, res) => {
  const newTransaction = new Transaction(req.body);
  await newTransaction.save();
  res.json(newTransaction);
});


// DELETE Transaction
router.delete("/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
// DELETE ALL transactions
router.delete("/delete-all", async (req, res) => {
  try {
    await Transaction.deleteMany({});
    res.send("All transactions deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
