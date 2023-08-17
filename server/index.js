require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors");
var helmet = require("helmet");
var compression = require("compression");
const queries = require("./queries");
const { initSocketServer } = require("./socket");

//port
const port = 8000;

//middleware
const app = express();
const server = http.createServer(app);
initSocketServer(server);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(compression());

app.get("/tags", queries.Messenger.getTags);
app.post("/messages", queries.Messenger.getMessages);
app.post("/sendMessage", queries.Messenger.sendMessage);
app.post("/createTag", queries.Messenger.createTag);
app.delete("/deleteTag", queries.Messenger.deleteTag);

server.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});
