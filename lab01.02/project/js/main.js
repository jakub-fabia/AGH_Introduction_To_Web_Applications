function toggleLanguage(element) {
    if (element.textContent === "EN") {
        element.textContent = "PL";
    } else {
        element.textContent = "EN";
    }
}

function onClickImage(element) {
    document.getElementById("fullscreen-video").style.display = "none";
    document.getElementById("fullscreen-image").style.display = "block";
    document.getElementById("fullscreen-image").src = element.src;
    document.getElementById("fullscreen").style.display = "flex";
}
function onClickVideo(element) {
    document.getElementById("fullscreen-video").style.display = "block";
    document.getElementById("fullscreen-image").style.display = "none";
    document.getElementById("fullscreen-video").src = element.src;
    document.getElementById("fullscreen").style.display = "flex";
}