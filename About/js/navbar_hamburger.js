// JavaScript will be added here
const hamburger = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');

// Function to toggle the navigation links' visibility
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close the menu if a link is clicked (optional, but good for UX)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});