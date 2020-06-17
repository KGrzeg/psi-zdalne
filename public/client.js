const websocket = io();

const button = document.querySelector("#wyslij");
const zadana = document.querySelector("#zadana");
const kp = document.querySelector("#kp");

button.addEventListener("click", () => {
  const dane = [zadana.value, kp.value];
  websocket.emit("aktualizacja", dane);
});
