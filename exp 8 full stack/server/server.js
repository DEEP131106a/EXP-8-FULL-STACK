const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

console.log("Starting server...");
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Set" : "Not set");

const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());

const { MongoMemoryServer } = require("mongodb-memory-server");

const connectDB = async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected (Memory Server)");
  } catch (err) {
    console.log("MongoDB Connection Error: ", err);
  }
};
connectDB();

// Routes
app.use("/", authRoutes);

// Protected routes
const auth = require("./middleware/auth");
console.log("auth type:", typeof auth);
const role = require("./middleware/role");

app.get("/dashboard", auth, (req, res) => {
  res.json({ msg: "User Dashboard" });
});

app.get("/admin", auth, role(["admin"]), (req, res) => {
  res.json({ msg: "Admin Dashboard" });
});

app.listen(5000, () => console.log("Server running on port 5000"));