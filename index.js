require("dotenv").config();
const express = require("express");
const http = require("http");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const morgan = require("morgan");
const createError = require("http-errors");
const path = require("path");
const moment = require("moment");
moment.locale("id");

const main = require("./src/router/index.routes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(cors());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(xss());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/", main);

// app.use("/c-img", express.static(path.join(__dirname, "/upload/category")));
// app.use("/p-img", express.static(path.join(__dirname, "/upload/product")));
// app.use("/ava", express.static(path.join(__dirname, "/upload/user")));

app.all("*", (req, res, next) => {
  next(new createError.NotFound());
});

app.use((err, req, res) => {
  const msg = err.message || "Internal Server Error";
  const code = err.status || 500;

  res.status(code).json({
    message: msg,
  });
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
