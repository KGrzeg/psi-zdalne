const net = require("net");
const readline = require("readline");

let matlab_socket = null;
const rl = readline.createInterface({
  input: process.stdin,
});

function wyslij(liczba) {
  const buffor = Buffer.allocUnsafe(8);
  buffor.writeDoubleBE(liczba);

  matlab_socket.write(buffor);
}

const server = net.createServer(function (socket) {
  socket.pipe(socket);
  matlab_socket = socket;
});

server.listen(2137, "127.0.0.1");

rl.on("line", (line) => {
  liczba = parseFloat(line);
  wyslij(liczba);
});
