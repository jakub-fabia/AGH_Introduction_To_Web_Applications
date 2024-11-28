const menuButtons = [
    { label: 'Easy', x: canvas.width / 2 - 200, y: canvas.height / 2 - 300, width: 400, height: 120, selected: false},
    { label: 'Medium', x: canvas.width / 2 - 200, y: canvas.height / 2 - 130, width: 400, height: 120, selected: false},
    { label: 'Hard', x: canvas.width / 2 - 200, y: canvas.height / 2 + 40, width: 400, height: 120, selected: false},
    { label: 'Play', x: canvas.width / 2 - 200, y: canvas.height / 2 + 270, width: 400, height: 120},
];

function baseMenu(){
    c.fillStyle = 'rgba(0, 0, 0, 0.8)';
    c.fillRect(canvas.width/4, 0, canvas.width*0.50, canvas.height);
    c.font = 'bold 100px Arial';
    c.fillStyle = 'red';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
}

function handleMainMenuClick(event) {
    if (gameState.inGame || gameState.playerDead) return;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    menuButtons.forEach(button => {
        if (
            mouseX > button.x &&
            mouseX < button.x + button.width &&
            mouseY > button.y &&
            mouseY < button.y + button.height
        ) {
            if (button.label === 'Play') {
                if(gameState.difficulty !== "") {
                    menuButtons.forEach(b => (b.selected = false));
                    setGameStateStart();
                    removeMainMenuListener();
                }
            } else{
                menuButtons.forEach(b => (b.selected = false));
                button.selected = true;
                gameState.difficulty = button.label;
            }
        }
    });
}

