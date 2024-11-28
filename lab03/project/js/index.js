function gameLoop() {
    renderBackground();
    renderLives();
    renderPoints();
    if (!gameState.inGame && !gameState.playerDead) {
        renderMainMenu();
    } else if (gameState.inGame) {
        handleGameInProgress();
    } else {
        renderGameOverMenu();
    }
    renderCrosshair();
    window.requestAnimationFrame(gameLoop);
}

function handleGameInProgress() {
    if (!gameState.startZombieGenerationActive) {
        initializeGameSession();
    }
    updateZombies();
    if (gameState.currentLife === 0) {
        endGameSession();
    }
}

function initializeGameSession() {
    removeMainMenuListener();
    addShootingListener();
    setDifficulty();
    gameState.startZombieGenerationActive = true;
    startZombieGeneration();
}

function endGameSession() {
    setGameStateGameOver();
    removeShootingListener();
    addGameOverListener();
}

addMainMenuListener();
gameLoop();