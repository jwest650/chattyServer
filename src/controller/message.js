const Mesg = require("../models/Message");

async function update_seen(req, res) {
     try {
          const { name, roomID } = req.body;
          const result = await Mesg.updateSeen(roomID, name);
          return res.status(200).json({ success: true, result });
     } catch (error) {
          return res.status(500).json({ success: false, error });
     }
}

module.exports = { update_seen };
