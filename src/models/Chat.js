const { Schema, default: mongoose } = require("mongoose");
const Message = require("./Message");
const User = require("../models/User");
const error = require("../middlewares/Error");

const Chats = new Schema(
     {
          host: String,
          friend: String,
          roomId: { type: String, unique: true },
          messages: [{ type: Schema.Types.ObjectId, ref: "messages" }],
     },
     {
          timestamps: true,
     }
);

Chats.statics.createChats = async function (host, friend, roomId) {
     try {
          const istrue = await User.getUser(friend);
          if (istrue.name == friend) {
               const user = await this.create({ host, friend, roomId });
               await this.create({ host: friend, friend: host, roomId });
               return user;
          } else {
               throw new Error("no user with such name");
          }
     } catch (error) {
          throw error;
     }
};
Chats.statics.getChats = async function (roomId) {
     try {
          const message = await Message.getMessage(roomId);
          const user = await this.findOne({ roomId: roomId });

          for (let i = 0; i < message.length; i++) {
               if (!user.messages.includes(message[i]._id)) {
                    user.messages.push(message[i]._id);
               }
          }
          const saved = await user.save();

          return saved;
     } catch (error) {
          throw error;
     }
};
Chats.statics.getFriends = async function (host) {
     try {
          const friends = await this.find({ host: host }, "friend roomId");
          let data = [];

          for (let i = 0; i < friends.length; i++) {
               data.push(friends[i].friend);
          }
          const user = await User.find(
               {
                    name: { $in: data },
               },
               "name image"
          );

          let res = [];
          for (let i = 0; i < friends.length; i++) {
               if (user[i].name == friends[i].friend) {
                    res.push({ roomID: friends[i].roomId, user: user[i] });
               }
          }

          return res;
     } catch (error) {
          throw error;
     }
};

module.exports = mongoose.model("chats", Chats);
