const User = require("../models/User");

async function create_user(req, res) {
     try {
          const { name, email, password, image } = req.body;
          const user = await User.createUser(name, email, password, image);
          return res.status(200).json({ success: true, user });
     } catch (error) {
          return res.status(500).json({ success: false, error });
     }
}

async function get_user(req, res) {
     try {
          const name = req.params.name;
          const user = await User.getUser(name);
          return res.status(200).json({ success: true, user });
     } catch (error) {
          return res.status(500).json({ success: false, error });
     }
}
async function get_users(req, res) {
     try {
          const users = await User.getUsers();
          return res.status(200).json({ success: true, users });
     } catch (error) {
          return res.status(500).json({ success: false, error });
     }
}
async function remove_user(req, res) {
     try {
          let email = req.params.email;
          await User.removeUser(email);
          return res
               .status(200)
               .json({ success: true, message: "user removed" });
     } catch (error) {
          return res.status(500).json({ success: false, error });
     }
}

module.exports = {
     create_user,
     get_user,
     get_users,
     remove_user,
};
