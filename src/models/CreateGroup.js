const { Schema, default: mongoose } = require("mongoose");
const Message = require("./Message");

const GroupChat = new Schema(
     {
          image: String,
          title: String,
          roomId: { type: String, unique: true },
          messages: [{ type: Schema.Types.ObjectId, ref: "messages" }],
          participants: Array,
          createdBy: String,
          admins: Array,
     },
     {
          timestamps: true,
     }
);

GroupChat.statics.createGroup = async function (
     image,
     roomId,
     title,
     createdBy
) {
     try {
          const group = await this.create({
               image,
               roomId,
               title,
               createdBy,
          });

          return group;
     } catch (error) {
          console.log(error);
     }
};

GroupChat.statics.getGroup = async function (name) {
     try {
          const groups = await this.find({ participants: { $in: [name] } });
          return groups;
     } catch (error) {
          console.log(error);
     }
};

GroupChat.statics.getGroupMessages = async function (roomId) {
     const message = await Message.getMessage(roomId);
     const group = await this.findOne({ roomId });
     for (let i = 0; i < message.length; i++) {
          if (!group.messages.includes(message[i]._id)) {
               group.messages.push(message[i]._id);
          }
     }
     const saved = await group.save();

     return saved;
};

GroupChat.statics.addFriendToGroup = async function (roomId) {
     try {
          const group = await this.findOne({ roomId });
          return group;
     } catch (error) {
          console.log(error);
     }
};

module.exports = mongoose.model("groups", GroupChat);
