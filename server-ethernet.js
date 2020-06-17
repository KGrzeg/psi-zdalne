var net = require("net");

var server = net.createServer(function (socket) {
  const liczba = 3;
  const buffor = Buffer.allocUnsafe(8);
  buffor.writeDoubleBE(liczba);

  socket.write(buffor);

  socket.pipe(socket);
});

server.listen(2137, "127.0.0.1");
