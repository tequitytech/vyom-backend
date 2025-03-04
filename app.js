import "dotenv/config";
import express from "express";
import path from "path";
import "./src/common/config/dbConnection";
import swaggerMainRoute from "./src/common/swagger";
import mainRoute from "./routes/index";
import helmet from "helmet";
import "./src/common/config/jwtPassport";
import rateLimit from "express-rate-limit";
import fs from "fs";

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(helmet()); // Adds security-related headers to the responses

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.all("*", (req, res, next) => {
  console.log(`API hit: ${req.method} ${req.originalUrl}`);
  next();
});

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 3,
//   message: {
//     status: 429,
//     error: "Too many requests. Please try again later.",
//   },
//   standardHeaders: true,
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });

// app.use(limiter);
app.use((error, req, res, next) => {
  console.log(error);
});

app.get("/", (req, res) => {
  res.status(200).send("App is working!");
});

app.use(swaggerMainRoute);
app.use(mainRoute);

app.use(express.static(path.join(__dirname + "/public")));
app.use(require("./src/common/middleware/error"));

const isSecure = process.env.IS_SECURE === "true";
const port = process.env.PORT;

if (isSecure) {
  var options = {
    key: fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/privkey.pem`),
    cert: fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/cert.pem`),
    ca: [
      fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/cert.pem`),
      fs.readFileSync(`${process.env.SSL_CERT_BASE_PATH}/fullchain.pem`),
    ],
  };
  var https = require("https").Server(options, app);

  https.listen(port, () => {
    console.log(`Https server is running on ${process.env.BASE_URL}`);
  });
} else {
  app.listen(port, () => {
    console.log(`listening at ${process.env.BASE_URL}:${port}`);
  });
}
