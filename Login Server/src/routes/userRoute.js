const { Router } = require("express");
const { User } = require("../models/User");
const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { user_ID, password } = req.body;
    if (typeof user_ID !== "string") return res.status(400).send({ err: "user_ID must be string" });
    if (typeof password !== "string") return res.status(400).send({ err: "password must be string" });
    const userFind = await User.findOne({ user_ID });
    if (!userFind) {
      const user = new User(req.body);
      await user.save();
      return res.status(200).send({ success: true });
    } else {
      return res.status(400).send({ err: "user_ID is already in use" });
    }
  } catch (err) {
    console.log(err);
  }
});

userRouter.post("/login", (req, res) => {
  try {
    if (!req.body.user_ID || !req.body.password) return res.status(400).send({ err: "user_ID and password must be required" });
    User.findOne({ user_ID: req.body.user_ID }, (err, user) => {
      if (!user) return res.status(400).send({ err: `${req.body.user_ID}은 존재하지 않습니다.` });
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) return res.status(400).send({ err: "password is not match" });
        else {
          //jwt 발급

          return res.status(200).send({ success: `${user.user_ID}의 접속 확인` });
        }
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

module.exports = { userRouter };
