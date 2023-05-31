const Group = require("../models/CreateGroup");
const User = require("../models/User");

const createGroup = async (req, res) => {
     const { name, image, roomID, title, createdBy } = req.body;
     try {
          const group = await Group.createGroup(
               image,
               roomID,
               title,
               createdBy
          );
          group.participants.push(name);
          group.save();

          return res.status(200).json({ success: "created" });
     } catch (error) {
          console.log(error);
     }
};

const getGroup = async (req, res) => {
     const user = req.params.name;
     try {
          const result = await Group.getGroup(user);
          res.status(200).json(result);
     } catch (error) {
          console.log(error);
          return res.status(500).json({ success: false, error: error.message });
     }
};

const getGroupMessages = async (req, res) => {
     try {
          const roomId = req.params.roomId;
          await Group.getGroupMessages(roomId);
          const chat = await Group.findOne({ roomId }).populate("messages");
          return res.status(200).json({ success: true, chat });
     } catch (error) {
          console.log(error);
          return res.status(500).json({ success: false, error: error.message });
     }
};

const addFriendToGroup = async (req, res) => {
     const { name, roomID } = req.body;

     try {
          const user = await User.getUser(name);
          if (user.name == name) {
               const result = await Group.addFriendToGroup(roomID);
               result.participants.push(name);
               result.save();
               return res.status(200).json({ success: "created" });
          }
     } catch (error) {
          console.log(error);
          return res.status(500).json({ success: false, error: error.message });
     }
};

module.exports = { createGroup, getGroup, addFriendToGroup, getGroupMessages };
