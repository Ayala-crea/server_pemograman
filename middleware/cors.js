// middleware/cors.js
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const configureMiddleware = (app) => {
  app.use(
    cors({
      origin: [
        "https://server-pemograman.vercel.app",
        "http://127.0.0.1:5501",
        "http://localhost:8089",
        "https://ayala-crea.github.io",
      ],
      methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE"],
      credentials: true,
      optionsSuccessStatus: 200,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};

module.exports = configureMiddleware;
