let points = 0;
const missPoints = 5;
let difficulty = "";
let basePoints = 0;
let hitPoints = 0;
let speedMultiplier = 0;
let zombies = []
let startZombieGenerationActive = false;

function drawPoints() {
    const pointsDisplay = points.toString().padStart(5, '0');
    c.font = 'bold 100px Impact';
    c.fillStyle = 'white';
    c.textAlign = 'right';
    c.fillText(`${pointsDisplay}`, canvas.width - 50, 150);
}

function setDifficulty() {
    if (difficulty === "Easy") {
        basePoints = 100;
        hitPoints = 40;
        speedMultiplier = 0.8;
    }
    else if (difficulty === "Medium") {
        basePoints = 50;
        hitPoints = 20;
        speedMultiplier = 1;
    }
    else if (difficulty === "Hard") {
        basePoints = 10;
        hitPoints = 10;
        speedMultiplier = 1.5;
    }
    points = basePoints;
    zombies = [];
}

function addShootingListeners() {
    canvas.addEventListener('click', handleShooting);
}

function removeShootingListeners() {
    canvas.removeEventListener('click', handleShooting);
}

function handleShooting(event) {
    if (points < missPoints) {return}
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    let hitIndex = -1

    zombies.some((zombie, index) => {
        if (
            mouseX > zombie.x - zombie.width &&
            mouseX < zombie.x &&
            mouseY > zombie.y - zombie.height &&
            mouseY < zombie.y
        ) {
            hitIndex = index;
            return true;
        }
        return false;
    });
    if (hitIndex !== -1) {
        points += hitPoints;
        zombies.splice(hitIndex, 1);
    } else {
        points -= missPoints
    }
}


function generateRandomZombie() {
    const size = Math.random() * 0.5 + 0.5;
    const speed = Math.random() * 3.2 + 1.7;
    const y = Math.random()*250;
    const zombie = new Zombie(size, speed, y, canvas.width);
    zombies.push(zombie);
}

function startZombieGeneration() {
    function spawnZombie() {
        generateRandomZombie();
        const randomInterval = Math.random() * 700 + 500;
        setTimeout(spawnZombie, randomInterval);
    }
    if (startZombieGenerationActive) {
        spawnZombie();
    }
}

function updateZombies() {
    zombies.sort((a, b) => a.y - b.y);
    zombies.forEach((zombie, index) => {
        zombie.update();
        if (zombie.x + zombie.width < 0) {
            zombies.splice(index, 1);
            currentLife -= 1
        }
    });
}

const zombieImage = new Image()
zombieImage.src = './img/walkingdead.png'
zombieImage.onload = () => {
    console.log('Zombie image loaded');
};
class Zombie{
    constructor(size, speed, y, x){
        this.size = size
        this.speed = speed;
        this.x = canvas.width+300;
        this.y = canvas.height-10-y;
        this.prespective = -0.0008*y + 1
        this.height = 312*this.size*this.prespective;
        this.width = 200*this.size*this.prespective;
        this.image = zombieImage
        this.frame = 0
        this.currentFrameTime = 0
        this.frameDuration = (10/this.speed)
        this.frameWidth = this.image.width/10
    }
    draw(){
        c.drawImage(
            this.image,
            this.frame*this.frameWidth, 0,
            this.frameWidth, this.image.height,
            this.x - this.width,
            this.y - this.height,
            this.width, this.height)
        }
    update(){
        this.draw()
        this.currentFrameTime += 1
        if (this.currentFrameTime >= this.frameDuration) {
            this.currentFrameTime = 0
            this.frame = (this.frame+1)%10
        }
        this.x -= this.speed*speedMultiplier;
    }
}