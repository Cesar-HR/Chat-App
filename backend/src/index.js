const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRouter");
const msgRoutes = require("./routes/msgRouter");
const socket = require("socket.io");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/message", msgRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connection successfully");
  })
  .catch((err) => {
    console.log("ocurred an error:", err);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on PORT ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: process.env.CLIENT,
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("New user connected to chat app");

  global.chatSocket = socket;

  socket.on("add-user-online", (_id) => {
    onlineUsers.set(_id, socket.id);
  });

  socket.on("send-message", (data) => {
    const sendMessageToUser = onlineUsers.get(data.to);

    if (sendMessageToUser) {
      socket.to(sendMessageToUser).emit("message-received", data.message);
    }
  });
});
