const { Router } = require("express");
const { User } = require("../models/User");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.NODE_ENV === "development" ? "secret-key" : process.env.SECRET_KEY;

const verifyJwt = async (token) => {
  return await jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return false;
    return decoded.user_ID;
  });
};

userRouter.post("/register", async (req, res) => {
  try {
    const { user_ID, user_Nick, user_Name, user_Driver, user_Phone, user_Email, user_Pw } = req.body;
    //타입 체크
    if (typeof user_ID !== "string") return res.status(400).send({ err: "user_ID must be string" });
    if (typeof user_Nick !== "string") return res.status(400).send({ err: "user_Nick must be string" });
    if (typeof user_Name !== "string") return res.status(400).send({ err: "user_Name must be string" });
    if (typeof user_Phone !== "string") return res.status(400).send({ err: "user_Phone must be string" });
    if (typeof user_Email !== "string") return res.status(400).send({ err: "user_Email must be string" });
    if (typeof user_Driver !== "boolean") return res.status(400).send({ err: "user_Driver must be boolean" });
    if (typeof user_Pw !== "string") return res.status(400).send({ err: "user_Pw must be string" });

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

userRouter.get("/login", async (req, res) => {
  try {
    if (!req.body.user_ID || !req.body.password) return res.status(400).send({ err: "user_ID and password must be required" });
    User.findOne({ user_ID: req.body.user_ID }, (err, user) => {
      if (!user) return res.status(400).send({ err: `${req.body.user_ID}은 존재하지 않습니다.` });
      user.comparePassword(req.body.password, async (err, isMatch) => {
        if (!isMatch) return res.status(400).send({ err: "password is not match" });
        else {
          //jwt 발급
          const [accessToken, refreshToken] = await Promise.all([
            jwt.sign({ user_ID: user.user_ID }, SECRET_KEY, { expiresIn: "30m" }),
            jwt.sign({ user_ID: user.user_ID }, SECRET_KEY, { expiresIn: "7d" }),
          ]);
          const [reqCookieAccessToken, reqCookieRefreshToken] = await Promise.all([verifyJwt(req.cookies.jwt), verifyJwt(req.cookies.refreshToken)]);
          console.log(reqCookieAccessToken, reqCookieRefreshToken);
          //토큰이 일치할때
          if (reqCookieAccessToken === reqCookieRefreshToken && user.token === req.cookies.refreshToken) return res.status(200).send({ success: true });

          //access token 이 유효하지 않음
          if (!reqCookieAccessToken) {
            //refreshToken까지 유효하지 않음
            if (!reqCookieRefreshToken || reqCookieRefreshToken !== user.user_ID) {
              user.token = refreshToken;
              await user.save();
              res.cookie("refreshToken", refreshToken, { maxAge: 6 * 24 * 60 * 60 * 999, httpOnly: true });
            }
            return res
              .status(200)
              .cookie("jwt", accessToken, { maxAge: 30 * 60 * 999, httpOnly: true })
              .send({ success: true });
          }
          if (!reqCookieRefreshToken) {
            user.token = refreshToken;
            user.save();
            return res
              .status(200)
              .cookie("refreshToken", refreshToken, { maxAge: 6 * 24 * 60 * 60 * 999, httpOnly: true })
              .send({ success: true });
          }
          return res.status(200).send({ success: `${user.user_ID}의 접속 확인`, name: user.user_ID });
        }
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

module.exports = { userRouter };
