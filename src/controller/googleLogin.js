const User = require("../models/User");

async function googleLogin(req, res) {
     try {
          let {
               user: { email },
               expires,
          } = req.body;
          const { name, image } = await User.getUser(email);

          //   res.header("Authorization", "Bearer " + req.authToken);
          return res.status(200).json({
               success: true,
               data: { name, image },
          });
     } catch (error) {
          console.log(error);
     }
}

module.exports = {
     googleLogin,
};
