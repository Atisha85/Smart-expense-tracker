const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const transactionsRoutes = require("./routes/transactionsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* API routes */
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionsRoutes);

/* MongoDB */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ---------- FRONTEND BUILD ---------- */

app.use(
  express.static(
    path.join(__dirname, "../smart-expense-tracker/build")
  )
);

app.get("/:path(*)", (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../smart-expense-tracker/build",
      "index.html"
    )
  );
});

/* ---------- PORT ---------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log("Server running on port", PORT)
);