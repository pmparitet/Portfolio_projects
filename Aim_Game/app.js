'use strict';

const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const autopilot = document.querySelector('#winTheGame');
const colors = ['#f231ff', '#ff0052', '#3F51B5', '#85ff00', '#ffc800', '#ffe714', '#673AB7', '#FF5722'];
let time = 0;
let score = 0;

let timerInterval;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();

    screens[0].classList.add('up');
});

function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle');

        if (circle) {
            circle.click();
            console.log('winTheGame - on');
        } else {
            clearInterval(timeId);
            console.log('winTheGame - off');
        }
    }

    const timeId = setInterval(kill, 100);
}

function finishGame() {
    clearInterval(timerInterval);
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счёт: <span class='primary'>${score}</span></h1>
    <button class="time-btn" id='play-again'>Переиграть</button>`;
    
    const playAgainBtn = document.querySelector('#play-again');
    playAgainBtn.addEventListener('click', (event) => {
        screens[1].classList.remove('up');
        timeEl.parentNode.classList.remove('hide');
        board.innerHTML = ``;
        score = 0;
    });
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);        
    }
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const index = Math.floor(Math.random() * colors.length);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = colors[index];

    board.append(circle);
}

function startGame() {
    timerInterval = setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

autopilot.addEventListener('click', event => {
    winTheGame();
    autopilot.remove();
});
