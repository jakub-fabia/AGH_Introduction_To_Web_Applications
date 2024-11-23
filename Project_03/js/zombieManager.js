let zombies = []
let basePoints = 0;
let hitPoints = 0;
let speedMultiplier = 0;

class Zombie{
    constructor(size, speed, y){
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

function setDifficulty() {
    if (gameState.difficulty === "Easy") {
        basePoints = 100;
        hitPoints = 40;
        speedMultiplier = 0.8;
    }
    else if (gameState.difficulty === "Medium") {
        basePoints = 50;
        hitPoints = 20;
        speedMultiplier = 1;
    }
    else if (gameState.difficulty === "Hard") {
        basePoints = 10;
        hitPoints = 10;
        speedMultiplier = 1.5;
    }
    gameState.points = basePoints;
    zombies = [];
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
    if (gameState.startZombieGenerationActive) {
        spawnZombie();
    }
}

function updateZombies() {
    zombies.sort((a, b) => a.y - b.y);
    zombies.forEach((zombie, index) => {
        zombie.update();
        if (zombie.x + zombie.width < 0) {
            zombies.splice(index, 1);
            gameState.currentLife -= 1
        }
    });
}