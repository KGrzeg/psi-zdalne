const express = require("express");
const app = express();
const port = 3005;

const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("aktualizacja", (dane) => {
    console.log(dane);
  });
});

http.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
