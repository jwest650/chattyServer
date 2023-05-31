require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const LoginRouter = require("./src/routes/login");
const GoogleRouter = require("./src/routes/google");
const UserRouter = require("./src/routes/User");
const ChatsRouter = require("./src/routes/chats");
const MessagesRouter = require("./src/routes/message");
const GroupRouter = require("./src/routes/group");
const socketIo = require("./src/utils/websocket");
const { Server } = require("socket.io");
const { createServer } = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const PORT = 5000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
     cors: {
          origin: "*",
          methods: ["GET", "POST"],
     },
});
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", UserRouter);
app.use("/login", LoginRouter);
app.use("/google", GoogleRouter);
app.use("/chats", ChatsRouter);
app.use("/messages", MessagesRouter);
app.use("/group", GroupRouter);
app.use((err, req, res, next) => {
     const status = err.status || 500;
     const message = err.error || err.message;
     res.status(status).json({
          message,
          err,
     });
     console.log(err);
});
socketIo(io);
mongoose.set("strictQuery", false);

async function startServer() {
     try {
          await mongoose.connect(process.env.MONGOOSE, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
          });
          console.log("Server connected");
     } catch (error) {
          console.log(error);
     }
}
httpServer.listen(PORT, () => {
     startServer();

     console.log("connected");
});
