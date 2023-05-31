const Message = require("../models/Message");
function socketIO(io) {
     let onlineUsers = [];
     let users = {};
     let counts = {};
     let lastseen = {};
     io.on("connection", async (socket) => {
          socket.on("online", (data) => {
               users[socket.id] = data.user;
               if (onlineUsers.indexOf(data.user) == -1 && data.user) {
                    onlineUsers.push(data.user);
               }

               io.emit("active", onlineUsers);
          });

          socket.on("join", (room) => {
               socket.leave(room);

               socket.join(room);
          });
          socket.on("typing", (room, user) => {
               io.to(room).emit("writing", user);
          });
          socket.on("message", async (data) => {
               let seen = false;
               try {
                    const {
                         name,
                         room,
                         message,
                         image,
                         attachPic,
                         audio,
                         rec,
                         doc,
                         replyMessage,
                         replyId,
                    } = data;
                    io.to(room).emit("message", data);

                    await Message.createMessage(
                         room,
                         message,
                         name,
                         image,
                         seen,
                         attachPic,
                         audio,
                         rec,
                         doc,
                         replyMessage,
                         replyId
                    );
                    io.to(room).emit("count", { name, room });
               } catch (error) {
                    console.log(error);
               }
          });
          socket.on("seen", (data) => {
               io.to(data).emit("mark", "true");
          });

          socket.on("disconnect", () => {
               if (users[socket.id]) {
                    let date = Date.now();
                    let user = users[socket.id];

                    let newOnlineUsers = onlineUsers.filter(
                         (val) => val !== users[socket.id]
                    );
                    lastseen[user] = date;
                    let seen = lastseen[user];

                    io.emit("offline", { seen, user });
                    onlineUsers = newOnlineUsers;
                    console.log(onlineUsers);
               }
          });
     });
}

module.exports = socketIO;
