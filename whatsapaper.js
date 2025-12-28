// The new whatsapp UI uses these attributes to pick a wallpaper image:
// - data-asset-chat-background-dark   - For Dark mode only
// - data-asset-chat-background-beige  - For Light mode only
//
// This simplifies the code by a lot, since we only need to add some styles to the doucment.

// Real-time wallpaper updates
document.addEventListener("wallpaper-updated", () => {
    getCurrentStyle()
        .then(styles => {
            document.getElementById('whatsapaper-styles').textContent = styles;
        })
});

const styleElement = document.createElement("style");
styleElement.id = "whatsapaper-styles";
// styleElement.textContent = await getCurrentStyle();
document.head.appendChild(styleElement);
getCurrentStyle()
    .then(styles => {
        document.getElementById('whatsapaper-styles').textContent = styles;
    })


/**
 * Creates the CSS code to put into the Styles element by obtaining the image
 * from the local storage or a default URL.
 * 
 * @returns The CSS code to put inside the `style` element
 */
async function getCurrentStyle() {
    const storageThing = (await browser.storage.local.get('whatsapaper-wallpaper'))['whatsapaper-wallpaper'];
    const userImage = storageThing ?? 'https://i.ytimg.com/vi/_dhd2GZyheo/maxresdefault.jpg';
    return `[data-asset-chat-background-dark], [data-asset-chat-background-beige] {
    opacity: 1.0 !important;
    background-image: url(${userImage}) !important;
    background-size: cover;
    background-position: center;
}`;
}