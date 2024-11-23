let inGame = false;
let playerDead = false;

addMenuListeners();

function display() {
    drawBackground();
    drawLives();
    drawPoints();
    if (!inGame && !playerDead) {
        drawMenu();
    } else if (!playerDead) {
        if (!startZombieGenerationActive) {
            removeMenuListeners();
            addShootingListeners()
            setDifficulty()
            startZombieGenerationActive = true;
            startZombieGeneration()
        }
        updateZombies()
        if(currentLife === 0) {
            playerDead = true;
            inGame = false;
            removeShootingListeners()
            addDeadMenuListeners();
        }
    } else {
        drawDeadMenu();
    }
    drawCursor();
    window.requestAnimationFrame(display);
}

display();