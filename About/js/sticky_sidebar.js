document.addEventListener('DOMContentLoaded', function() {
    const sidebar_content = document.querySelector('.context-main');
    const footer = document.querySelector('.site-footer');

    // Ensure both elements exist before proceeding
    if (!sidebar_content || !footer) {
        console.warn("One or more elements (.context-main or .site-footer) not found.");
        return;
    }

    function checkAndAdjustPosition() {
        const sidebarContentRect = sidebar_content.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();

        // Check for vertical overlap: if the bottom of sidebar_content is at or below the top of the footer
        const overlapsVertically = sidebarContentRect.bottom >= footerRect.top;

        if (overlapsVertically) {
            console.log("Overlap detected! Setting .context-main position to 'absolute'.");
            sidebar_content.style.position = 'absolute';
            // You might also want to set top/left/right/bottom properties if 'absolute' positioning needs specific placement
            // For example, to make it stick to its current horizontal position:
            // sidebar_content.style.left = sidebarContentRect.left + 'px';
            // sidebar_content.style.top = sidebarContentRect.top + 'px'; // Or adjust as needed for desired scroll behavior
        } else {
            // Optional: If you want to revert to original position when not overlapping
            // console.log("No overlap. Reverting .context-main position to default (e.g., 'static' or 'relative').");
            // sidebar_content.style.position = ''; // Clears the inline style
            // sidebar_content.style.left = '';
            // sidebar_content.style.top = '';
        }
    }

    // Run the check immediately on page load
    checkAndAdjustPosition();

    // Optionally, run the check on scroll or window resize to handle dynamic layouts
    window.addEventListener('scroll', checkAndAdjustPosition);
    window.addEventListener('resize', checkAndAdjustPosition);
});