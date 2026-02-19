const upload = document.getElementById("upload");
const userImage = document.getElementById("userImage");
const clothingOverlay = document.getElementById("clothingOverlay");

// Upload user image
upload.addEventListener("change", function(event) {
    const reader = new FileReader();
    reader.onload = function(){
        userImage.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
});

// Change clothing
function changeClothes(element) {
    clothingOverlay.src = element.src;
}

// DRAG FUNCTIONALITY
let isDragging = false;
let startX, startY;

clothingOverlay.addEventListener("mousedown", function(e) {
    isDragging = true;
    startX = e.clientX - clothingOverlay.offsetLeft;
    startY = e.clientY - clothingOverlay.offsetTop;
});

document.addEventListener("mousemove", function(e) {
    if (isDragging) {
        clothingOverlay.style.left = (e.clientX - startX) + "px";
        clothingOverlay.style.top = (e.clientY - startY) + "px";
    }
});

document.addEventListener("mouseup", function() {
    isDragging = false;
});

// SCROLL TO RESIZE
clothingOverlay.addEventListener("wheel", function(e) {
    e.preventDefault();
    let currentWidth = clothingOverlay.offsetWidth;
    if (e.deltaY < 0) {
        clothingOverlay.style.width = currentWidth + 10 + "px";
    } else {
        clothingOverlay.style.width = currentWidth - 10 + "px";
    }
});
