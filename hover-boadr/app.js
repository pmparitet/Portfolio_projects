'use strict';

const board = document.querySelector('#board');
// const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
// const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
const colors = ['#f231ff', '#ff0052', '#3F51B5', '#85ff00', '#ffc800', '#ffe714', '#673AB7', '#FF5722'];
const SQUARES_NUMBER = 500;

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function setColor(event) {
    const element = event.target;
    const color = getRandomColor();
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(event) {
    const element = event.target;
    element.style.backgroundColor = '#1d1d1d';
    element.style.boxShadow = `0 0 2px #000`;
}

for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    square.addEventListener('mouseover', setColor);

    square.addEventListener('mouseleave', removeColor);

    board.append(square);
}
