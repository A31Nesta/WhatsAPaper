/**
 * Checks if the file provided is actually an image.
 * 
 * @param {File} image 
 */
export function isImage(image) {
    return image.type.startsWith('image');
}

/**
 * Converts an image from the input element into a
 * Data URL that WhatsApp web can use and render.
 * 
 * ---
 * 
 * > *WhatsApp Web* can only render images that from some
 * sites like YouTube for embeds and previews so we use Base64
 * as a bypass.
 * 
 * ---
 * 
 * @param {File | Blob} image The File that we obtain as user input
 * @param {Function} callback A Function that takes a Data URL as a parameter to run once the file is converted
 */
export function withBase64(image, callback) {
    const reader = new FileReader();
    reader.onload = () => callback(reader.result);
    reader.onerror = () => {
        console.error('Error loading file :(');
    }
    reader.readAsDataURL(image);
}

/**
 * Saves the wallpaper to local storage so that the
 * main JS (whatsapaper.js) can retrieve it and set
 * it as wallpaper.
 * 
 * @param {string} wallpaper A Data URL for an image
 */
export async function save(wallpaper) {
    await browser.storage.local.set({'whatsapaper-wallpaper': wallpaper});
    document.dispatchEvent(new Event('wallpaper-updated'));
}