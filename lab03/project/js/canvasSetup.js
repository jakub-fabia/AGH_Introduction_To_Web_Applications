const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const mousePosition = {
    x: canvas.width / 2,
    y: canvas.height / 2
};

canvas.addEventListener('mousemove', (event) => {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
});