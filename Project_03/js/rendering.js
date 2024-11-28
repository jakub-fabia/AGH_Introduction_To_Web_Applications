function renderBackground() {
    c.drawImage(background, 0,0, background.width, background.height, 0,0, canvas.width, canvas.height)
}

function renderCrosshair() {
    c.shadowBlur = 2;
    c.shadowColor = '#999';
    const crosshairSize = 300;
    c.drawImage(crosshair, mousePosition.x - crosshairSize / 2, mousePosition.y - crosshairSize / 2, crosshairSize, crosshairSize);
    c.shadowBlur = 0;
}

function renderLives() {
    const lifeImage = lifeImages[gameState.currentLife];
    c.drawImage(lifeImage, 50, 50);
}

function renderMainMenu() {
    sadMusic.pause()
    sadMusic.currentTime = 0;
    baseMenu();
    c.fillText(`Zombie Shooter`, canvas.width / 2,150);
    menuButtons.forEach(button => {
        c.fillStyle = button.selected ? 'red' : 'white';
        c.fillRect(button.x, button.y, button.width, button.height);
        c.font = 'bold 72px Arial';
        c.fillStyle = 'black';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(button.label, button.x + button.width / 2, button.y + button.height / 2);
    });
}

function renderPoints() {
    const pointsDisplay = gameState.points.toString().padStart(5, '0');
    c.font = 'bold 100px Impact';
    c.fillStyle = 'white';
    c.textAlign = 'right';
    c.fillText(`${pointsDisplay}`, canvas.width - 50, 150);
}

function renderGameOverMenu() {
    sadMusic.play()
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
