const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const UserSchema = new Schema({
  user_ID: { type: String, required: true, unique: true, maxlength: 50 },
  password: { type: String, required: true },
  token: String,
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
UserSchema.methods.comparePassword = function (reqPassword, cb) {
  const user = this;
  bcrypt.compare(reqPassword, user.password).then(function (isMatch) {
    if (isMatch) {
      cb(null, isMatch);
    } else {
      cb(false, isMatch);
    }
  });
};

const User = model("user", UserSchema);
module.exports = { User };
