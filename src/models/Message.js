const { Schema, default: mongoose } = require("mongoose");

const Message = new Schema(
     {
          roomId: String,
          message: String,
          name: String,
          image: String,
          seen: Boolean,
          attachPic: Array,
          audio: String,
          rec: String,
          doc: String,
          replyMessage: String,
          replyId: String,
     },
     {
          timestamps: true,
     }
);
Message.statics.createMessage = async function (
     roomId,
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
) {
     try {
          const user = await this.create({
               roomId,
               message,
               name,
               image,
               seen,
               attachPic,
               audio,
               rec,
               doc,
               replyMessage,
               replyId,
          });
          return user;
     } catch (error) {
          throw error;
     }
};
Message.statics.getMessage = async function (roomId) {
     try {
          const user = await this.find({ roomId: roomId });
          return user;
     } catch (error) {
          throw error;
     }
};
Message.statics.updateSeen = async function (roomID, recipient) {
     try {
          const mesg = await this.updateMany(
               { roomId: roomID, name: recipient },
               { seen: true }
          );

          return mesg;
     } catch (error) {
          throw error;
     }
};

module.exports = mongoose.model("messages", Message);
