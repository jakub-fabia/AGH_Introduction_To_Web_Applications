const gameState = {
    inGame: false,
    playerDead: false,
    startZombieGenerationActive: false,
    currentLife: 3,
    points: 0,
    difficulty: "",
};

function startGame() {
    gameState.inGame = true;
    gameState.playerDead = false;
}

function endGame() {
    gameState.inGame = false;
    gameState.playerDead = true;
}

function resetGameState() {
    gameState.inGame = false;
    gameState.playerDead = false;
    gameState.currentLife = 3;
    gameState.points = 0;
    gameState.startZombieGenerationActive = false;
}