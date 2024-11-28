const playAgain = { label: 'Play Again', x: canvas.width / 2 - 200, y: canvas.height / 2 + 100, width: 400, height: 120}

function handleGameOverMenuClick(event) {
    if (!gameState.playerDead) return;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    if (
        mouseX > playAgain.x &&
        mouseX < playAgain.x + playAgain.width &&
        mouseY > playAgain.y &&
        mouseY < playAgain.y + playAgain.height
    ) {
        setGameStateMenu()
        removeGameOverMenuListener();
        addMainMenuListener();
    }
}


