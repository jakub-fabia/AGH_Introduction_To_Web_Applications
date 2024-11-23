const missPoints = 5;

function handleShooting(event) {
    if (gameState.points < missPoints) {return}
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    let hitIndex = -1

    zombies.some((zombie, index) => {
        if (
            mouseX > zombie.x - zombie.width &&
            mouseX < zombie.x &&
            mouseY > zombie.y - zombie.height &&
            mouseY < zombie.y
        ) {
            hitIndex = index;
            return true;
        }
        return false;
    });
    if (hitIndex !== -1) {
        gameState.points += hitPoints;
        zombies.splice(hitIndex, 1);
    } else {
        gameState.points -= missPoints
    }
}

