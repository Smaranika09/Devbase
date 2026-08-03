const timer = document.getElementById("timer");
const startBtn = document.querySelector(".start-btn");
const pauseBtn = document.querySelector(".pause-btn");
const resetBtn = document.querySelector(".stop-btn");

let seconds = 0;
let interval = null;


function updateTimer() {
  let hrs = Math.floor(seconds / 3600);
  let mins = Math.floor((seconds % 3600) / 60);
  let secs = seconds % 60;

  timer.innerText = String(hrs).padStart(2, "0") + " : " + String(mins).padStart(2, "0") + " : " + String(secs).padStart(2, "0");
}


startBtn.addEventListener("click", () => {
  if(interval) {
    return;
  }

  interval = setInterval(() => {
    seconds++;
    updateTimer();
  }, 1000);
});


pauseBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
});


resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  seconds = 0;
  updateTimer();
});

updateTimer();