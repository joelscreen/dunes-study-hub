// Pomodoro timer
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const timer = document.getElementById("timer");
const title = document.getElementById("title");

let timeLeft = 1500;
let interval;
let isRunning = false;
let cycles = 0;
let status_timer = "focus";
let alarm = new Audio("/static/alarm.mp3")

const updateTimer = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timer.innerHTML =
    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}
const startTimer = () => {
    title.innerText = "Focus"
    if (isRunning) return;
    isRunning = true;

    if (status_timer !== "focus") status_timer = "focus";

    clearInterval(interval);
    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(interval);
            isRunning = false;
            alarm.play()
            alert("Break time!");
            status_timer = "break";
            title.innerText = "Break"
            breakTimer();
        }
    }, 1000)
}

const breakTimer = () => {
    updateTimer();

    if (cycles === 3) {
        status_timer = "long break";
        title.innerText = "Long break"
        cycles = 0;
    }

    clearInterval(interval);
    isRunning = true;

    if (status_timer === "long break") {
        timeLeft = 900;
    } else if (status_timer === "break") {
        timeLeft = 300;
    }

    interval = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            clearInterval(interval);
            isRunning = false;
            timeLeft = 1500;
            status_timer = "focus";
            cycles++;
            alarm.play()
            alert("Study time!");
            updateCycles();
            console.log(cycles);
            updateTimer();
        }
    }, 1000)
}

const stopTimer = () => {
    clearInterval(interval);
    isRunning = false;
}

const resetTimer = () => {
    clearInterval(interval);
    timeLeft = 1500;
    isRunning = false;
    status_timer = "focus";
    title.innerText = "Pomodoro"
    updateTimer();
}

start.addEventListener("click", startTimer);
stop.addEventListener("click", stopTimer);
reset.addEventListener("click", resetTimer);

// To-Do list
const todoEntry = document.getElementById("todo-entry");
const addTodoBtn = document.getElementById("add-todo");
const todoList = document.getElementById("todo-list");

function addTodo() {
  const taskText = todoEntry.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.textContent = taskText;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "Done";
  delBtn.classList.add("delete-btn");
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
  });

  li.appendChild(delBtn);
  todoList.appendChild(li);
  todoEntry.value = "";
}

addTodoBtn.addEventListener("click", addTodo);

todoEntry.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});

// Cycles
const cycles_text = document.getElementById("cycles");

const updateCycles = () => {
    cycles_text.textContent = `Cycles: ${cycles}/3`;
}

updateCycles()

// White noise
let white_noise_running = false;
let noise = new Audio("/static/white_noise.mp3");

noise.loop = true;

function white_noise() {
    white_noise_running = !white_noise_running;

    if (white_noise_running) {
        noise.play();
    } else {
        noise.pause();
        noise.currentTime = 0;
    }
}

