const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./data/database");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const socket = require("socket.io");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});

connectDB;
