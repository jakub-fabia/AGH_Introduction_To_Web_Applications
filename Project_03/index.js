const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Background
canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const background = new Image()
background.src = './img/board-bg.jpg'

function drawBackground() {
    c.drawImage(background, 0,0, background.width, background.height, 0,0, canvas.width, canvas.height)
}

// Cursor - Aim
const cursorImage = new Image();
cursorImage.src = './img/aim.png';

const mouse = {
    x: canvas.width / 2, // Start at the center
    y: canvas.height / 2
};

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

function drawCursor() {
    c.shadowBlur = 2;
    c.shadowColor = '#999';
    const cursorSize = 300;
    c.drawImage(cursorImage, mouse.x - cursorSize / 2, mouse.y - cursorSize / 2, cursorSize, cursorSize);
    c.shadowBlur = 0;
}

// Lives images
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

let currentLife = 3;

function changeLife() {
    currentLife = (currentLife - 1 + 4) % 4;
}

function drawLives() {
    const lifeImage = lifeImages[currentLife];
    c.drawImage(lifeImage, 50, 50);
}

// Score counter
let points = 0;

function drawPoints() {
    const pointsDisplay = points.toString().padStart(5, '0');
    c.font = 'bold 100px Impact';
    c.fillStyle = 'white';
    c.textAlign = 'right';
    c.fillText(`${pointsDisplay}`, canvas.width - 50, 150);
}

// Animate function
function animate() {
    drawBackground()
    drawLives();
    drawCursor()
    drawPoints()

    window.requestAnimationFrame(animate);
}

animate()