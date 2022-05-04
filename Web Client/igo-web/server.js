const { createServer: https } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const ports = {
  https: 3000,
};

const httpsOptions = {
  key: fs.readFileSync("./ssl/localhost.key"),
  cert: fs.readFileSync("./ssl/localhost.crt"),
};

app.prepare().then(() => {
  https(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(ports.https, (err) => {
    if (err) throw err;
    console.log(`> HTTPS: Ready on https://localhost:${ports.https}`);
  });
});
