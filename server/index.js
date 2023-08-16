require("dotenv").config();
const express = require("express");
const cors = require("cors");
var helmet = require("helmet");
var compression = require("compression");
const queries = require("./queries");

//port
const port = 8000;

//middleware
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(compression());

app.get("/messages", queries.Messenger.getMessages);
app.get("/tags", queries.Messenger.getTags);
app.post("/message", queries.Messenger.sendMessage);
// TODO: create and delete tag
app.post("/createTag", queries.Messenger.createTag);
app.delete("/deleteTag", queries.Messenger.deleteTag);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}.`);
});
