const { Server } = require("socket.io");

const io = new Server(null, {
  pingInterval: 10000,
  pingTimeout: 5000,
});

const initSocketServer = (server) => {
  io.attach(server);

  io.on("connection", (socket) => {
    console.log("client connected: ", socket.id);
  });
};

module.exports = { io, initSocketServer };
