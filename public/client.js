const websocket = io();

const button = document.querySelector("#wyslij");
const zadana = document.querySelector("#zadana");
const kp = document.querySelector("#kp");
const odpowiedz = document.querySelector("#odpowiedz");

button.addEventListener("click", () => {
  const dane = [zadana.value, kp.value];
  websocket.emit("aktualizacja", dane);
});

websocket.on("odpowiedz", (liczba) => {
  liczba = (liczba * 10000).toFixed() / 10000;
  odpowiedz.innerText = liczba;
});
