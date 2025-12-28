import { isImage, save, withBase64 } from "./util.js";

// Elements:
const imageInput = document.getElementById("image-input");
const urlInput = document.getElementById("url-input");
const applyButton = document.getElementById("apply");
// Debug-only element
// const selectedWpp = document.getElementById("selected-wpp");

// Functions
function setFromFile() {
    const file = imageInput.files[0];
    
    // Check that it's an image
    if (!isImage(file)) {
        console.error("File selected is not an image");
        return;
    }

    // Convert and process
    withBase64(file, (wallpaper) => {
        // selectedWpp.src = wallpaper;
        save(wallpaper);
    })
}

function setFromURL() {
    const url = urlInput.value;
    
    fetch(url)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Couldn't fetch ${url}. Error ${res.status} (${res.statusText})`);
            }
            return res.blob();
        })
        .then(image => {
            withBase64(image, (wallpaper) => {
                // selectedWpp.src = wallpaper;
                save(wallpaper);
            });
        })
}

// Event listeners
imageInput.onchange = setFromFile;
applyButton.onclick = setFromURL;