const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionsRoutes");

const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
// Serve frontend
app.use(express.static(
  path.join(__dirname, "../smart-expense-tracker/build")
));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../smart-expense-tracker/build/index.html")
  );
});
const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

