const websocket = io();

const button = document.querySelector("#wyslij");
const zadana = document.querySelector("#zadana");
const kp = document.querySelector("#kp");
const odpowiedz = document.querySelector("#odpowiedz");
const chart = new SmoothieChart({
  maxValue: 5,
  minValue: -1,
  millisPerPixel: 31,
  grid: { fillStyle: "rgba(27,8,44,0.81)" },
});
const canvas = document.getElementById("smoothie-chart");
const series = new TimeSeries();

chart.addTimeSeries(series, {
  lineWidth: 2,
  strokeStyle: "rgba(255,217,0,0.77)",
});
chart.streamTo(canvas, 573);

button.addEventListener("click", () => {
  const dane = [zadana.value, kp.value];
  websocket.emit("aktualizacja", dane);
});

websocket.on("odpowiedz", (liczba) => {
  const now = new Date().getTime();
  series.append(now, liczba);

  liczba = (liczba * 10000).toFixed() / 10000;
  odpowiedz.innerText = liczba;
});
