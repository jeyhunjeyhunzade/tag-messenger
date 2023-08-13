require("dotenv").config();
const express = require("express");
const cors = require("cors");
var helmet = require("helmet");
var compression = require("compression");
const queries = require("./queries");
const Auth = require("./helpers/auth.js");

//port
const port = 8000;

//middleware
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(compression());

//Messages

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}.`);
});
