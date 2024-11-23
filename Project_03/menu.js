const menuButtons = [
    { label: 'Easy', x: canvas.width / 2 - 200, y: canvas.height / 2 - 300, width: 400, height: 120, selected: false},
    { label: 'Medium', x: canvas.width / 2 - 200, y: canvas.height / 2 - 130, width: 400, height: 120, selected: false},
    { label: 'Hard', x: canvas.width / 2 - 200, y: canvas.height / 2 + 40, width: 400, height: 120, selected: false},
    { label: 'Play', x: canvas.width / 2 - 200, y: canvas.height / 2 + 270, width: 400, height: 120},
];

function baseMenu(){
    c.fillStyle = 'rgba(0, 0, 0, 0.8)'; // Black with 80% opacity
    c.fillRect(canvas.width/4, 0, canvas.width*0.50, canvas.height);
    c.font = 'bold 100px Arial';
    c.fillStyle = 'red';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
}

function drawMenu() {
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

function handleMenuClick(event) {
    if (inGame || playerDead) return;

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
                if(difficulty !== "") {
                    inGame = true;
                    menuButtons.forEach(b => (b.selected = false));
                    removeMenuListeners();
                }
            } else{
                menuButtons.forEach(b => (b.selected = false));
                button.selected = true;
                difficulty = button.label;
            }
        }
    });
}


function addMenuListeners() {
    canvas.addEventListener('click', handleMenuClick);
}

function removeMenuListeners() {
    canvas.removeEventListener('click', handleMenuClick);
}