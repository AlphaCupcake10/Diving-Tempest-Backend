const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { jwtconfig } = require('../configs/server-config');

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: [true,"cannot be empty"],
            unique: true,
            match: [/^[a-zA-Z0-9]+$/, "is invalid"],
        },
        password:{
            type: String,
            required: [true,"cannot be empty"],
            minLength: [6, "is too short"],
        }
    }
);

userSchema.pre("save", function (next) {
    if (this.isModified("password") || this.isNew) {
      const user = this;
      const SALT = bcrypt.genSaltSync(10);
      const HASH = bcrypt.hashSync(user.password, SALT);
      user.password = HASH;
      next();
    } else {
      return next();
    }
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function () {
    return jwt.sign(
      {
        id: this.userID,
        username: this.username,
      },
      jwtconfig.secret,
      { expiresIn: jwtconfig.expiration }
    );
};

const User = mongoose.model("User", userSchema);

module.exports = User;