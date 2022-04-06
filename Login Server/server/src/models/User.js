const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const UserSchema = new Schema(
  {
    user_ID: { type: String, required: true, unique: true, maxlength: 50 },
    user_Pw: { type: String, required: true },
    user_Email: { type: String, required: true },
    token: { type: String, unique: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("user_Pw")) {
    user.user_Pw = await bcrypt.hash(user.user_Pw, 10);
    console.log(user.user_Pw);
    next();
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = async function (reqPassword, cb) {
  const user = this;
  await bcrypt.compare(reqPassword, user.user_Pw).then(function (isMatch) {
    if (isMatch) {
      cb(null, isMatch);
    } else {
      cb(true, isMatch);
    }
  });
};

const User = model("user", UserSchema);
module.exports = { User };
