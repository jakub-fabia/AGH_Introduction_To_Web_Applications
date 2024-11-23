function display() {
    drawBackground();
    drawLives();
    drawPoints();

    if (!gameState.inGame && !gameState.playerDead) {
        drawMenu();
    } else if (gameState.inGame) {
        if (!gameState.startZombieGenerationActive) {
            removeMenuListeners();
            addShootingListeners();
            setDifficulty();
            gameState.startZombieGenerationActive = true;
            startZombieGeneration();
        }
        updateZombies();
        if (gameState.currentLife === 0) {
            endGame();
            removeShootingListeners();
            addDeadMenuListeners();
        }
    } else {
        drawDeadMenu();
    }

    drawCursor();
    window.requestAnimationFrame(display);
}

addMenuListeners();
display();
