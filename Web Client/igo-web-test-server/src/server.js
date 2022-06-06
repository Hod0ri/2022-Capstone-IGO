const port = 8080;
const express = require("express");
const app = express();
const cors = require("cors");
const { pointRouter } = require("./routes/point");
const { issueRouter } = require("./routes/issue");

const server = async () => {
  app.use(
    cors({
      origin: true, // '*' 안됨 -> 정확한 주소 또는 origin: true로 해도 됨
      credentials: true,
    })
  );
  app.use(express.json());
  app.use("/api/point", pointRouter);
  app.use("/api/issue", issueRouter);

  app.listen(port, () => console.log(`Server listening on ${port}port`));
};

server();
