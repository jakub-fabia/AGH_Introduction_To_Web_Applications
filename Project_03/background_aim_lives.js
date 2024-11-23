// Basic setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

let currentLife = 3;

// Images conversion
const background = new Image()
background.src = './img/board-bg.jpg'

const crosshair = new Image();
crosshair.src = './img/aim.png';

const lifeImages = [
    './img/0heart.png',
    './img/1heart.png',
    './img/2heart.png',
    './img/3heart.png'
].map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

function drawBackground() {
    c.drawImage(background, 0,0, background.width, background.height, 0,0, canvas.width, canvas.height)
}

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

function drawCursor() {
    c.shadowBlur = 2;
    c.shadowColor = '#999';
    const crosshairSize = 300;
    c.drawImage(crosshair, mouse.x - crosshairSize / 2, mouse.y - crosshairSize / 2, crosshairSize, crosshairSize);
    c.shadowBlur = 0;
}

function changeLife() {
    currentLife = (currentLife - 1 + 4) % 4;
}

function drawLives() {
    const lifeImage = lifeImages[currentLife];
    c.drawImage(lifeImage, 50, 50);
}