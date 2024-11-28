function addGameOverListener() {
    canvas.addEventListener('click', handleGameOverMenuClick);
}

function removeGameOverMenuListener() {
    canvas.removeEventListener('click', handleGameOverMenuClick);
}

function addShootingListener() {
    canvas.addEventListener('click', handleShooting);
}

function removeShootingListener() {
    canvas.removeEventListener('click', handleShooting);
}

function addMainMenuListener() {
    canvas.addEventListener('click', handleMainMenuClick);
}

function removeMainMenuListener() {
    canvas.removeEventListener('click', handleMainMenuClick);
}