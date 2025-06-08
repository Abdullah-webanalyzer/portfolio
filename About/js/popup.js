document.addEventListener('DOMContentLoaded', (event) => {
    const popupOverlay = document.querySelector('.popup-overlay');
    const closeButton = document.querySelector('.close-popup');

    // Event listener for the close button
    closeButton.addEventListener('click', () => {
        popupOverlay.style.display = 'none'; // Hide the popup overlay
    });

    // Optional: Close popup if clicking outside the popup box
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });
});