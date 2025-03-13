const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Transaction = require("../models/Transaction");

// Add a new transaction
router.post("/", protect, async (req, res) => {
  try {
    const { description, amount, type } = req.body;

    if (!description || !amount || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction = await Transaction.create({
      user: req.user.id,
      description,
      amount,
      type, // "income" or "expense"
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all transactions for a user
router.get("/", protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a transaction
router.delete("/:id", protect, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await transaction.deleteOne();
    res.json({ message: "Transaction removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
