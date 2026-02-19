document.addEventListener("DOMContentLoaded", function() {

    const upload = document.getElementById("upload");
    const userImage = document.getElementById("userImage");
    const clothingOverlay = document.getElementById("clothingOverlay");

    // Upload image
    upload.addEventListener("change", function(event) {
        const reader = new FileReader();
        reader.onload = function(){
            userImage.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    });

    // Change clothing
    window.changeClothes = function(element) {
        clothingOverlay.src = element.src;
    }

    // ================= DRAG (DESKTOP) =================
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

    // ================= TOUCH DRAG =================
    clothingOverlay.addEventListener("touchstart", function(e) {
        const touch = e.touches[0];
        startX = touch.clientX - clothingOverlay.offsetLeft;
        startY = touch.clientY - clothingOverlay.offsetTop;
    });

    clothingOverlay.addEventListener("touchmove", function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        clothingOverlay.style.left = (touch.clientX - startX) + "px";
        clothingOverlay.style.top = (touch.clientY - startY) + "px";
    });

    // ================= RESIZE (DESKTOP SCROLL) =================
    clothingOverlay.addEventListener("wheel", function(e) {
        e.preventDefault();
        let currentWidth = clothingOverlay.offsetWidth;
        if (e.deltaY < 0) {
            clothingOverlay.style.width = currentWidth + 10 + "px";
        } else {
            clothingOverlay.style.width = currentWidth - 10 + "px";
