const { Schema, default: mongoose } = require("mongoose");

const User = new Schema(
     {
          name: { type: String, unique: true },
          email: String,
          password: String,
          image: String,
     },
     {
          timestamps: true,
     }
);

User.statics.createUser = async function (name, email, password, image) {
     try {
          const user = await this.create({
               name,
               email,
               password,
               image,
          });
          return user;
     } catch (error) {
          throw error;
     }
};
User.statics.getUser = async function (name) {
     try {
          const user = await this.findOne({ name });
          if (!user) throw { error: "no such user" };
          return user;
     } catch (error) {
          throw error;
     }
};
User.statics.removeUser = async function (name) {
     try {
          const user = await this.remove({ name });
          return user;
     } catch (error) {
          throw error;
     }
};
User.statics.getUsers = async function () {
     try {
          const user = await this.find();
          return user;
     } catch (error) {
          throw error;
     }
};

module.exports = mongoose.model("User", User);
