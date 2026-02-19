document.addEventListener("DOMContentLoaded", function() {

    const upload = document.getElementById("upload");
    const userImage = document.getElementById("userImage");
    const clothingOverlay = document.getElementById("clothingOverlay");

    // Initially disable overlay interaction
    clothingOverlay.style.pointerEvents = "none";

    // ================= UPLOAD IMAGE =================
    upload.addEventListener("change", function(event) {
        const reader = new FileReader();
        reader.onload = function(){
            userImage.src = reader.result;
        }
        reader.readAsDataURL(event.target.files[0]);
    });

    // ================= CHANGE CLOTHES =================
    window.changeClothes = function(element) {
        clothingOverlay.src = element.src;
        clothingOverlay.style.pointerEvents = "auto"; // Enable interaction only after selecting dress
    };

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

    // ================= TOUCH DRAG (PHONE) =================
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

    // ================= DESKTOP SCROLL RESIZE =================
    clothingOverlay.addEventListener("wheel", function(e) {
        e.preventDefault();
        let currentWidth = clothingOverlay.offsetWidth;

        if (e.deltaY < 0) {
            clothingOverlay.style.width = (currentWidth + 10) + "px";
        } else {
            if (currentWidth > 50) {
                clothingOverlay.style.width = (currentWidth - 10) + "px";
            }
        }
    });

    // ================= BUTTON RESIZE (WORKS ON PHONE) =================
    window.resizeClothing = function(direction) {
        let currentWidth = clothingOverlay.offsetWidth;
        let newWidth = currentWidth + direction * 15;

        if (newWidth > 50) {
            clothingOverlay.style.width = newWidth + "px";
        }
    };

});
