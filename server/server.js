const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
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

const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
