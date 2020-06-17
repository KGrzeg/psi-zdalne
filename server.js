const net = require("net");
const express = require("express");
const app = express();
const port = 3005;

const http = require("http").createServer(app);
const io = require("socket.io")(http);

let matlab_socket = null;

function wyslij(tablica) {
  const buffor = Buffer.allocUnsafe(8);

  for (let i = 0; i < tablica.length; ++i) {
    buffor.writeDoubleBE(tablica[i]);
    matlab_socket.write(buffor);
  }
}

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("aktualizacja", (dane) => {
    console.log(dane);
    wyslij(dane);
  });
});

const server = net.createServer(function (socket) {
  matlab_socket = socket;

  socket.on("data", (data) => {
    const liczba = data.readDoubleBE();
    console.log("<<< " + liczba);

    io.sockets.emit("odpowiedz", liczba);
  });
});

http.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
server.listen(2137, "127.0.0.1");
