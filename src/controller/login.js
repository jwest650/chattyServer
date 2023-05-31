function login(req, res) {
     res.header("Authorization", "Bearer " + req.authToken);
     const { name, image, email } = req.user;
     return res
          .status(200)
          .json({ success: true, data: { name, image, email } });
}

module.exports = {
     login,
};
