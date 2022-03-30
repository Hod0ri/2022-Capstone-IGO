const port = 23712;
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/userRoute");
const MONGO_URI = "mongodb://root:root@localhost:3333/LoginServer?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const cors = require("cors");

app.use(cors());
const server = async () => {
  try {
    let mongooseConnection = await mongoose.connect(MONGO_URI);
    console.log("db connected!");
    app.use(express.json());
    app.use(cookieParser());

    //라우트 작성
    app.use("/user", userRouter);

    app.listen(port, () => console.log(`server is starting at ${port}`));
  } catch (err) {
    console.log(err);
  }
};
server();
