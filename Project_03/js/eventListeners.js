function addDeadMenuListeners() {
    canvas.addEventListener('click', handleDeadMenuClick);
}

function removeDeadMenuListeners() {
    canvas.removeEventListener('click', handleDeadMenuClick);
}

function addShootingListeners() {
    canvas.addEventListener('click', handleShooting);
}

function removeShootingListeners() {
    canvas.removeEventListener('click', handleShooting);
}

function addMenuListeners() {
    canvas.addEventListener('click', handleMenuClick);
}

function removeMenuListeners() {
    canvas.removeEventListener('click', handleMenuClick);
}