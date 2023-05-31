const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret = "jay";

const encode = async (req, res, next) => {
     try {
          const { name, password } = req.body;
          console.log(name);
          const user = await User.getUser(name);
          const authToken = jwt.sign({ user }, secret);
          req.authToken = authToken;
          req.user = user;
          next();
     } catch (error) {
          return res.status(400).json({ success: false, message: error });
     }
};
const decode = async (req, res, next) => {
     if (!req.headers["authorization"]) {
          return res
               .status(400)
               .json({ success: false, message: "no access token" });
     }
     try {
          const token = req.headers.authorization.split(" ")[1];
          const decoded = jwt.verify(token, secret);
          req.auth = decoded;

          console.log(decoded);
          next();
     } catch (error) {}
};

module.exports = {
     encode,
     decode,
};
