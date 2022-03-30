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

module.exports = { userRouter };
