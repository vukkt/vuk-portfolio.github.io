// script.js

document.addEventListener('DOMContentLoaded', function() {
    loadPage('home');
    setupStopwatch(); // Add this line to set up the stopwatch event listeners
});

document.addEventListener('click', function(event) {
    if (event.target.tagName === 'A' && event.target.dataset.page) {
        event.preventDefault();
        loadPage(event.target.dataset.page);
    }

    if (event.target.id === 'button') {
        // Toggle the glowing class on the button
        event.target.classList.toggle('glowing');
        // Change the text of the button
        const buttonText = event.target.textContent.trim().toLowerCase();
        event.target.textContent = buttonText === 'make me glow' ? 'Turn Me Off' : 'Make Me Glow';
    }

    if (event.target.id === 'startStopButton') {
        // Toggle the stopwatch
        toggleStopwatch();
    }

    if (event.target.id === 'resetButton') {
        // Reset the stopwatch
        resetStopwatch();
    }
});

function loadPage(page) {
    console.log('Attempting to load page:', page);
    fetch(page + '.html')
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('Page not found or other fetch error');
            }
            return response.text();
        })
        .then(data => {
            console.log('Page content:', data);
            document.getElementById('content').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}

function setupStopwatch() {
    // No need to redeclare these constants here, as they are already in stopwatch.js
    // const startStopButton = document.getElementById('startStopButton');
    // const resetButton = document.getElementById('resetButton');

    startStopButton.addEventListener('click', toggleStopwatch);
    resetButton.addEventListener('click', resetStopwatch);
}

let stopwatchInterval;
let stopwatchRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;

function toggleStopwatch() {
    if (stopwatchRunning) {
        clearInterval(stopwatchInterval);
        document.getElementById('startStopButton').textContent = 'Start';
    } else {
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        document.getElementById('startStopButton').textContent = 'Stop';
    }
    stopwatchRunning = !stopwatchRunning;
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateStopwatchDisplay();
    document.getElementById('startStopButton').textContent = 'Start';
}

function updateStopwatch() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
    const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    document.getElementById('stopwatch').textContent = formattedTime;
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}
