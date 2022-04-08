const port = 23712;
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/auth/userRoute");
const MONGO_URI = "mongodb://root:root@mongodb/LoginServer?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const cors = require("cors");
const logger = require("morgan");

app.use(cors());
const server = async () => {
  try {
    let mongooseConnection = await mongoose.connect(MONGO_URI);
    //mongoose.set("debug", true);
    console.log("db connected!");
    app.use(logger("dev"));
    app.use(express.json());
    app.use(cookieParser());
    //라우트 작성

    app.use("/api/auth/user", userRouter);
    // 못잡은 에러 처리
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
