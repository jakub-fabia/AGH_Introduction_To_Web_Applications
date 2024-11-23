const playAgain = { label: 'Play Again', x: canvas.width / 2 - 200, y: canvas.height / 2 + 100, width: 400, height: 120}

function handleDeadMenuClick(event) {
    if (!playerDead) return;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    if (
        mouseX > playAgain.x &&
        mouseX < playAgain.x + playAgain.width &&
        mouseY > playAgain.y &&
        mouseY < playAgain.y + playAgain.height
    ) {
        startZombieGenerationActive = false;
        difficulty = ""
        playerDead = false;
        currentLife = 3
        removeDeadMenuListeners();
        addMenuListeners();
    }
}

function drawDeadMenu() {
    baseMenu();
    zombies = []
    c.fillText(`You Died!`, canvas.width / 2,400);
    c.fillStyle = 'white';
    c.fillRect(playAgain.x, playAgain.y, playAgain.width, playAgain.height);

    c.font = 'bold 72px Arial';
    c.fillStyle = 'black';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(playAgain.label, playAgain.x + playAgain.width / 2, playAgain.y + playAgain.height / 2);
}

function addDeadMenuListeners() {
    canvas.addEventListener('click', handleDeadMenuClick);
}

function removeDeadMenuListeners() {
    canvas.removeEventListener('click', handleDeadMenuClick);
}