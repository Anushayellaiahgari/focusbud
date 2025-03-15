// Timer Variables
let timer;
let timeLeft;
let isRunning = false;

// Default Time Durations (in seconds)
let pomodoroTime = 25 * 60;
let shortBreakTime = 5 * 60;
let longBreakTime = 15 * 60;

// DOM Elements
const timerDisplay = document.getElementById("timer");
const modeDisplay = document.getElementById("mode");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const settingsButton = document.getElementById("settings");
const modal = document.getElementById("settings-modal");
const closeSettings = document.getElementById("close-settings");
const saveSettings = document.getElementById("save-settings");

// Timer Mode Buttons
const pomodoroButton = document.querySelector(".nav-item:nth-child(1)");
const shortBreakButton = document.querySelector(".nav-item:nth-child(2)");
const longBreakButton = document.querySelector(".nav-item:nth-child(3)");

// Input Fields
const pomodoroInput = document.getElementById("pomodoro-input");
const shortBreakInput = document.getElementById("short-break-input");
const longBreakInput = document.getElementById("long-break-input");

// Function to Set Timer Mode
function setTimer(duration, mode) {
    clearInterval(timer);
    timeLeft = duration * 60;
    modeDisplay.textContent = mode;
    updateDisplay();
    startButton.textContent = "Start";
    isRunning = false;
}

// Function to Start/Pause Timer
function toggleTimer() {
    if (isRunning) {
        clearInterval(timer);
        startButton.textContent = "Start";
    } else {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateDisplay();
            } else {
                clearInterval(timer);
                startButton.textContent = "Start";
                isRunning = false;
                alert("Time's up! Take a break.");
            }
        }, 1000);
        startButton.textContent = "Pause";
    }
    isRunning = !isRunning;
}

// Function to Reset Timer
function resetTimer() {
    clearInterval(timer);
    if (modeDisplay.textContent === "Pomodoro") {
        timeLeft = pomodoroTime;
    } else if (modeDisplay.textContent === "Short Break") {
        timeLeft = shortBreakTime;
    } else if (modeDisplay.textContent === "Long Break") {
        timeLeft = longBreakTime;
    }
    updateDisplay();
    startButton.textContent = "Start";
    isRunning = false;
}

// Function to Update Timer Display
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Open Settings Modal
settingsButton.addEventListener("click", () => {
    modal.style.display = "flex";
});

// Close Settings Modal
closeSettings.addEventListener("click", () => {
    modal.style.display = "none";
});

// Save Settings and Update Timers
saveSettings.addEventListener("click", () => {
    pomodoroTime = parseInt(pomodoroInput.value) * 60;
    shortBreakTime = parseInt(shortBreakInput.value) * 60;
    longBreakTime = parseInt(longBreakInput.value) * 60;

    if (modeDisplay.textContent === "Pomodoro") {
        timeLeft = pomodoroTime;
    } else if (modeDisplay.textContent === "Short Break") {
        timeLeft = shortBreakTime;
    } else if (modeDisplay.textContent === "Long Break") {
        timeLeft = longBreakTime;
    }

    updateDisplay();
    modal.style.display = "none";
});

// Update Timer on Clicking Mode Buttons
pomodoroButton.addEventListener("click", () => setTimer(pomodoroTime / 60, "Pomodoro"));
shortBreakButton.addEventListener("click", () => setTimer(shortBreakTime / 60, "Short Break"));
longBreakButton.addEventListener("click", () => setTimer(longBreakTime / 60, "Long Break"));

// Attach Event Listeners to Buttons
startButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", resetTimer);

// Initial Display Update
setTimer(pomodoroTime / 60, "Pomodoro");
