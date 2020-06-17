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
  matlab_socket = socket;

  socket.on("data", (data) => {
    const liczba = data.readDoubleBE();
    console.log("<<< " + liczba);
  });
});

server.listen(2137, "127.0.0.1");

rl.on("line", (line) => {
  liczba = parseFloat(line);
  wyslij(liczba);
});
