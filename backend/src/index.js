const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connection made: ", socket.id);

  socket.emit("id", { id: socket.id });
  io.emit("new-connection", { connid: socket.id });

  socket.on("message", ({ value }) => {
    io.emit("message", { senderid: socket.id, value });
  });
});

http.listen(8000, () => {
  console.log("listening on port 8000");
});
