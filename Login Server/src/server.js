const port = 23712;
const express = require("express");
const app = express();

const mongoose = require("mongoose");
const MONGO_URI = "mongodb://root:root@localhost:27017/BlogService?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const server = async () => {
  let mongooseConnection = await mongoose.connect(MONGO_URI);
  console.log("db connected!");

  app.use(express.json());

  //라우트 작성

  console.log(`server is starting at ${port}`);
};
server();
