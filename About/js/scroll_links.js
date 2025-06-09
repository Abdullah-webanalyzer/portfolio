document.addEventListener('DOMContentLoaded', function() {
    const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get dynamic navbar height
    const navLinks = document.querySelectorAll('a[data-target]'); // Select links with data-target
    const down_to_navbar = document.getElementById('down_to_navbar'); // Select the div with external-body class

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
    const new_margin_top=navbarHeight; // Calculate new margin-top value
    down_to_navbar.style.marginTop = `${new_margin_top}px`; // Adjust margin-top of the div with external-body class
});
