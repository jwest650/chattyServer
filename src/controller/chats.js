const Chats = require("../models/Chat");

const chats = async (req, res, next) => {
     const { host, friend, roomID } = req.body;
     try {
          const chats = await Chats.createChats(host, friend, roomID);
          return res.status(200).json({ success: true, chats });
     } catch (error) {
          next(error);
     }
};
const getMessages = async (req, res, next) => {
     const roomId = req.params.room;
     try {
          await Chats.getChats(roomId);
          const chat = await Chats.findOne({ roomId }).populate("messages");
          return res.status(200).json({ success: true, chat });
     } catch (error) {
          next(error);
     }
};
const getFriends = async (req, res, next) => {
     const host = req.params.host;
     try {
          const friends = await Chats.getFriends(host);

          return res.status(200).json({ success: true, friends });
     } catch (error) {
          next(error);
     }
};

module.exports = { chats, getMessages, getFriends };
