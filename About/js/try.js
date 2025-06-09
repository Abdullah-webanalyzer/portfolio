document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.context');
    const footer = document.querySelector('.site-footer');
    const externalBody = document.querySelector('.external-body'); // The parent of the sidebar and main content

    if (!sidebar || !footer || !externalBody) {
        console.warn('One or more elements for sticky sidebar not found. Ensure .context, .site-footer, and .external-body exist.');
        return; // Exit if elements are missing
    }

    // Define the initial top offset for the fixed sidebar
    // This should match the `top` value in your CSS for `.context`
    const fixedTopOffset = 20; // px

    let isSidebarFixed = true; // Flag to track current state

    // Function to calculate the stop point for the sidebar
    // This is the scroll position where the bottom of the sidebar
    // would meet the top of the footer.
    function getStopScrollPosition() {
        // Get the current height of the sidebar
        const sidebarHeight = sidebar.offsetHeight;
        // Get the top position of the footer relative to the document
        const footerOffsetTop = footer.offsetTop;

        // The point where the bottom of the FIXED sidebar would touch the top of the footer
        // fixedTopOffset accounts for the space at the top when fixed
        return footerOffsetTop - sidebarHeight - fixedTopOffset;
    }

    // Function to handle scroll events, debounced for performance
    let scrollTimeout;
    function handleScroll() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const currentScrollTop = window.scrollY || window.pageYOffset;
            const stopScrollPosition = getStopScrollPosition();

            if (currentScrollTop >= stopScrollPosition) {
                // If scrolling past the stop point, make sidebar absolute
                if (isSidebarFixed) { // Only apply if state changes
                    sidebar.style.position = 'absolute';
                    // The 'top' for absolute position needs to be relative to its *positioned parent*
                    // The 'externalBody' is the positioned parent (position: relative).
                    // We need to calculate its top relative to externalBody's top.
                    // (footerOffsetTop - sidebarHeight) is where the bottom of the sidebar should be
                    // Subtract externalBody.offsetTop to get it relative to externalBody.
                    const topForAbsolute = footer.offsetTop - sidebarHeight - externalBody.offsetTop;
                    sidebar.style.top = `${topForAbsolute}px`;
                    isSidebarFixed = false;
                }
            } else {
                // Otherwise, keep it fixed
                if (!isSidebarFixed) { // Only apply if state changes
                    sidebar.style.position = 'fixed';
                    sidebar.style.top = `${fixedTopOffset}px`;
                    isSidebarFixed = true;
                }
            }
        }, 10); // Debounce time in ms
    }

    // Set initial position on page load (in case user reloads mid-scroll)
    handleScroll();

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Recalculate stop position on window resize to adjust for layout changes
    // Debounce this as well for performance
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleScroll(); // Re-evaluate position on resize
        }, 100);
    });
});