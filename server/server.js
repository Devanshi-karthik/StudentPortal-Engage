require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const loaders = require("./loaders/index");

const app = express();

// Initialize express and connect DB
loaders(app);

const { port, nodeEnv } = require("./config/config");
const hostname = "0.0.0.0";
const server = app.listen(
  port,
  hostname,
  // console.log(`Server started on port ${hostname} ${port} in ${nodeEnv} mode.`)
  console.log(`Server running at http://${hostname}:${port}/`)
);

// Handle promise rejections
const handlePromiseRejections = require("./utils/handlePromiseRejections");
handlePromiseRejections(server);
