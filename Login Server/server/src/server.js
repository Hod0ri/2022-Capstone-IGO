const port = 23712;
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/auth/userRoute");
const MONGO_ROOT_DATA = process.env.MONGO_ROOT_ID ? `${process.env.MONGO_ROOT_ID}:${process.env.MONGO_ROOT_PW}` : "root:root";
const MONGO_URI = `mongodb://${MONGO_ROOT_DATA}@mongodb/LoginServer?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;
const COOKIE_SECRET_KEY = process.env.NODE_ENV === "development" ? "cookie-key" : process.env.COOKIE_SECRET_KEY;
const cors = require("cors");
const logger = require("morgan");
const { kakaoRouter } = require("./routes/auth/kakaoRoute");

const server = async () => {
  try {
    let mongooseConnection = await mongoose.connect(MONGO_URI);
    //mongoose.set("debug", true);
    console.log("db connected!");
    app.use(
      cors({
        origin: true, // '*' 안됨 -> 정확한 주소 또는 origin: true로 해도 됨
        credentials: true,
      })
    );

    app.use(logger("dev"));
    app.use(express.json());
    app.use(cookieParser(COOKIE_SECRET_KEY));
    //라우트 작성

    app.use("/api/auth/user", userRouter);
    // 못잡은 에러 처리
    app.use("/api/kakao", kakaoRouter);
    app.use((error, req, res, next) => {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    });
    app.listen(port, () => console.log(`server is starting at ${port}`));
  } catch (err) {
    console.log(err);
  }
};
server();
