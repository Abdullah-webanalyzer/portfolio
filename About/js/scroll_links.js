document.addEventListener('DOMContentLoaded', function() {
    const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get dynamic navbar height
    const navLinks = document.querySelectorAll('a[data-target]'); // Select links with data-target

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetId = this.dataset.target;
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - navbarHeight - 10; // 10px for extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth" // Optional: adds smooth scrolling
                });
            }
        });
    });
});
