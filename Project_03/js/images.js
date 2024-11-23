const background = new Image()
background.src = './img/board-bg.jpg'

const crosshair = new Image();
crosshair.src = './img/aim.png';

const sadMusic = new Audio('img/sad-music.mp3');

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

const zombieImage = new Image()
zombieImage.src = './img/walkingdead.png'
