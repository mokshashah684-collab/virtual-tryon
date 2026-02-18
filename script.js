const upload = document.getElementById("upload");
const userImage = document.getElementById("userImage");
const clothingOverlay = document.getElementById("clothingOverlay");

upload.addEventListener("change", function(event) {
    const reader = new FileReader();
    reader.onload = function() {
        userImage.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
});

function changeClothes(element) {
    clothingOverlay.src = element.src;
}

function downloadImage() {
    alert("Right click and save image for now!");
}
let isDragging = false;
let offsetX, offsetY;

clothingOverlay.addEventListener("mousedown", function(e) {
    isDragging = true;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
});

document.addEventListener("mousemove", function(e) {
    if (isDragging) {
        clothingOverlay.style.left = (e.pageX - offsetX) + "px";
        clothingOverlay.style.top = (e.pageY - offsetY) + "px";
    }
});

document.addEventListener("mouseup", function() {
    isDragging = false;
});
