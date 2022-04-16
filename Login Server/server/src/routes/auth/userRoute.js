const { Router, urlencoded } = require("express");
const { User } = require("../../models/User");

const userRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");

const JWT_SECRET_KEY = process.env.NODE_ENV === "development" ? "secret-key" : process.env.JWT_SECRET_KEY;
const cookieSettings = {
  jwt: {
    //쿠키를 세션 쿠키로 변경
    //maxAge: 30 * 60 * 999,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  },
  exp: {
    //쿠키를 세션 쿠키로 변경
    // maxAge: 6 * 24 * 60 * 60 * 999,
    httpOnly: true,
    signed: true,
    sameSite: "none",
    secure: true,
  },
};
const verifyJwt = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) return false;
    return decoded.user_Id;
  });
};

//회원가입
userRouter.post("/", async (req, res) => {
  //만약 토큰이 있다면 삭제
  res.clearCookie("jwt").clearCookie("refreshToken");

  try {
    const { user_Id, user_Nick, user_Name, user_Driver, user_Phone, user_Email, user_Pw } = req.body;
    //타입 체크
    if (typeof user_Id !== "string") return res.status(400).send({ success: false, err: "user_Id must be string" });
    if (typeof user_Nick !== "string") return res.status(400).send({ success: false, err: "user_Nick must be string" });
    if (typeof user_Name !== "string") return res.status(400).send({ success: false, err: "user_Name must be string" });
    if (typeof user_Phone !== "string") return res.status(400).send({ success: false, err: "user_Phone must be string" });
    if (typeof user_Email !== "string") return res.status(400).send({ success: false, err: "user_Email must be string" });
    if (typeof user_Driver !== "boolean") return res.status(400).send({ success: false, err: "user_Driver must be boolean" });
    if (typeof user_Pw !== "string") return res.status(400).send({ success: false, err: "user_Pw must be string" });

    const [getUserId, getUserNick] = await Promise.all([User.findOne({ user_Id }), User.findOne({ user_Nick })]);
    if (!getUserId && !getUserNick) {
      //const apiRegister = await axios.post("te");
      const user = new User(req.body);
      await user.save();
      return res.status(200).send({ success: true });
    } else {
      return res.status(400).send({ success: false, err: "user_Id or user_Nick is already in use" });
    }
  } catch (err) {
    console.log(err);
  }
});

userRouter.get("/", async (req, res) => {
  const { refreshToken } = req.signedCookies;
  if (!refreshToken) return res.clearCookie("jwt").status(400).send({ success: false, err: "invalid access" });
  try {
    const reqCookieRefreshToken = verifyJwt(refreshToken);
    if (reqCookieRefreshToken) {
      const user = await User.findOne({ user_Id: reqCookieRefreshToken, token: refreshToken });
      if (user) {
        const accessToken = jwt.sign({ user_Id: user.user_Id }, JWT_SECRET_KEY, { expiresIn: "30m" });
        console.log(`${user.user_Id} access token 재발급`);
        return res.status(201).cookie("jwt", accessToken, cookieSettings.jwt).send({ success: true, user_Nick: user.user_Nick });
      } else {
        return res.status(400).clearCookie("jwt").clearCookie("refreshToken").send({ success: false, err: "invalid access" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    if (!req.body.user_Id || !req.body.user_Pw) return res.status(400).send({ success: false, err: "user_Id and user_Pw must be required" });
    User.findOne({ user_Id: req.body.user_Id }, (err, user) => {
      if (!user)
        return res
          .status(400)
          .clearCookie("jwt")
          .clearCookie("refreshToken")
          .send({ success: false, err: `${req.body.user_Id}은 존재하지 않습니다.` });

      user.comparePassword(req.body.user_Pw, async (err, isMatch) => {
        //user_Pw와 req.body.user_Pw 가 다른경우 오류 처리
        if (!isMatch) return res.status(400).clearCookie("jwt").clearCookie("refreshToken").send({ success: false, err: "user_Pw is not match" });
        //req의 쿠키에 담겨 있는 모든 데이터는 무시한다. => 이미 로그인 한 경우 여기로 다시 인증요청이 오면 모든 쿠키는 재 설정 된다.
        //accessToken, refreshToken 발급
        const [accessToken, refreshToken] = await Promise.all([
          jwt.sign({ user_Id: user.user_Id }, JWT_SECRET_KEY, { expiresIn: "30m" }),
          jwt.sign({ user_Id: user.user_Id }, JWT_SECRET_KEY, { expiresIn: "7d" }),
        ]);

        user.token = refreshToken;
        //db저장
        await user.save();

        return res.status(201).cookie("jwt", accessToken, cookieSettings.jwt).cookie("refreshToken", refreshToken, cookieSettings.exp).send({ success: true, user_Nick: user.user_Nick });

        /*
          const [reqCookieAccessToken, reqCookieRefreshToken] = await Promise.all([verifyJwt(req.cookies.jwt), verifyJwt(req.signedCookies.refreshToken)]);
          //토큰과 현재 로그인 시도한 유저의 정보가 일치 하지 않을때
          if (reqCookieRefreshToken && reqCookieRefreshToken !== user.user_Id) {
            console.log(`비정상 로그인 감지 ${reqCookieRefreshToken} -!-> ${user.user_Id}`);
            (user.token = ""), await user.save();
            return res.status(400).clearCookie("jwt").clearCookie("refreshToken").send({ success: false, err: "비정상 로그인 감지" });
          }
          //jwt 발급
          const [accessToken, refreshToken] = await Promise.all([
            jwt.sign({ user_Id: user.user_Id }, SECRET_KEY, { expiresIn: "30m" }),
            jwt.sign({ user_Id: user.user_Id }, SECRET_KEY, { expiresIn: "7d" }),
          ]);

          //토큰이 일치할때( 토큰이 존재 하는지 확인 )
          if (reqCookieAccessToken && reqCookieAccessToken === reqCookieRefreshToken && user.token === req.signedCookies.refreshToken) {
            res.header("Authorization", req.signedCookies.refreshToken);
            return res.status(201).send({ success: true, user_Nick: user.user_Nick });
          }
          //access token 이 유효하지 않음
          else if (!reqCookieAccessToken) {
            //refreshToken까지 유효하지 않음
            if (!reqCookieRefreshToken || reqCookieRefreshToken !== user.user_Id) {
              user.token = refreshToken;
              await user.save();
              res.cookie("refreshToken", refreshToken, cookieSettings.exp);
            }
            return res.status(200).cookie("jwt", accessToken, cookieSettings.jwt).send({ success: true, user_Nick: user.user_Nick });
          } else if (!reqCookieRefreshToken || user.token !== req.signedCookies.refreshToken) {
            user.token = refreshToken;
            user.save();
            return res.status(200).cookie("refreshToken", refreshToken, cookieSettings.exp).send({ success: true, user_Nick: user.user_Nick });
          } else {
            return res.status(400).send({ success: false, err: "refreshToken id invalid" });
          }
          */
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ success: false, err: err.message });
  }
});

userRouter.put("/", async (req, res) => {
  let { user_Id, user_Name, user_Nick, user_Driver, user_Phone, user_Email, user_Pw } = req.body;

  if (user_Id || user_Name) return res.status(400).send({ success: false, err: "user_Id or user_Name can not change" });
  if (user_Nick && typeof user_Nick !== "string") return res.status(400).send({ success: false, err: "user_Nick must be string" });
  if (user_Driver && typeof user_Driver !== "boolean") return res.status(400).send({ success: false, err: "user_Driver must be boolean" });
  if (user_Phone && typeof user_Phone !== "string") return res.status(400).send({ success: false, err: "user_Phone must be string" });
  if (user_Email && typeof user_Email !== "string") return res.status(400).send({ success: false, err: "user_Email must be string" });
  if (user_Pw && typeof user_Pw !== "string") return res.status(400).send({ success: false, err: "user_Pw must be string" });

  user_Id = verifyJwt(req.cookies.jwt);
  if (!user_Id) return res.status(400).clearCookie("jwt").send({ success: false, err: "login is invalid" });
  //api 서버 통신 코드 작성 예정

  if (user_Pw) {
    req.body.user_Pw = await bcrypt.hash(user_Pw, 10);
  }

  await User.findOneAndUpdate({ user_Id }, { $set: { ...req.body } });
  return res.status(200).send({ success: true });
});

userRouter.delete("/", async (req, res) => {
  const user_Pw = req.body.user_Pw;
  if (!user_Pw) return res.status(400).send({ success: false, err: "user_Pw is required" });
  const [reqCookieAccessToken, reqCookieRefreshToken] = await Promise.all([verifyJwt(req.cookies.jwt), verifyJwt(req.signedCookies.refreshToken)]);
  if (reqCookieAccessToken && reqCookieRefreshToken && reqCookieAccessToken === reqCookieRefreshToken) {
    const user = await User.findOne({ user_Id: reqCookieAccessToken });
    if (!user) return res.status(400).clearCookie("jwt").clearCookie("refreshToken").send({ success: false, err: "user is not found, logout" });
    user.comparePassword(user_Pw, async (err, isMatch) => {
      if (!isMatch) return res.status(400).send({ success: false, err: "password mismatch" });
      await user.delete();
      return res.status(200).clearCookie("jwt").clearCookie("refreshToken").send({ success: true });
    });
  } else {
    return res.status(400).clearCookie("jwt").clearCookie("refreshToken").send({ success: false, err: "token is invalid" });
  }
});

//logout

/*
@method logout
토큰 삭제
*/
userRouter.get("/logout", async (req, res) => {
  if (req.signedCookies.refreshToken) {
    const user_Id = await verifyJwt(req.signedCookies.refreshToken);
    user_Id && (await User.findOneAndUpdate({ user_Id }, { $set: { token: "" } }));
  }
  return res.status(200).clearCookie("jwt").clearCookie("refreshToken").send({ success: true });
});

module.exports = { userRouter };
