require("dotenv").config();
const { Server } = require("socket.io");

const isProduction = process.env.NODE_ENV === "production";
const origin = isProduction
  ? "https://tag-messenger-client.vercel.app"
  : "http://localhost:5173";

const io = new Server(null, {
  pingInterval: 10000,
  pingTimeout: 5000,
  cors: {
    origin,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  },
});

const initSocketServer = (server) => {
  io.attach(server);

  io.on("connection", (socket) => {
    console.log("client connected: ", socket.id);
  });
};

module.exports = { io, initSocketServer };
