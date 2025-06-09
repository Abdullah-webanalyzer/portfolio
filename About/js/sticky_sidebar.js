document.addEventListener('DOMContentLoaded', function() {
    const sidebar_content = document.querySelector('.context-main');
    const footer = document.querySelector('.site-footer');

    // Store the original position (usually 'static' or 'relative')
    let originalPosition = 'static'; 
    let originalTop = '';
    let originalLeft = '';
    let originalWidth = '';

    // Store the scroll position where sidebar_content should become 'absolute'
    // This is the point where its bottom aligns with the footer's top
    let fixedThresholdScrollY = -1; // -1 indicates it hasn't been set yet

    if (sidebar_content) {
        const computedStyle = window.getComputedStyle(sidebar_content);
        originalPosition = computedStyle.position;
        originalTop = computedStyle.top;
        originalLeft = computedStyle.left;
        originalWidth = computedStyle.width;
    }

    // Ensure both elements exist
    if (!sidebar_content || !footer) {
        console.warn("One or more elements (.context-main or .site-footer) not found.");
        return;
    }

    function checkAndAdjustPosition() {
        const sidebarContentRect = sidebar_content.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();

        // Calculate the actual current scroll position
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Condition for sidebar_content to become 'absolute':
        // 1. Its bottom edge is at or below the footer's top edge (potential overlap).
        // OR
        // 2. We've previously established a fixed threshold, and the current scroll
        //    is at or beyond that threshold, meaning we should prevent it from going further down.
        const shouldBeAbsolute = (sidebarContentRect.bottom >= footerRect.top) ||
                                 (fixedThresholdScrollY !== -1 && currentScrollY >= fixedThresholdScrollY);

        if (shouldBeAbsolute) {
            // If it's not already absolute, set it to absolute
            if (sidebar_content.style.position !== 'absolute') {
                console.log("Activating 'absolute' positioning for .context-main.");
                
                // Calculate the top position relative to the document
                // This is the window's scroll position PLUS the current top of the footer
                // minus the height of the sidebar content.
                // This ensures the sidebar content's bottom aligns with the footer's top.
                const newTopPosition = footerRect.top + currentScrollY - sidebarContentRect.height;
                
                sidebar_content.style.position = 'absolute';
                sidebar_content.style.top = newTopPosition + 'px';
                sidebar_content.style.left = sidebarContentRect.left + 'px'; // Maintain current horizontal position
                sidebar_content.style.width = sidebarContentRect.width + 'px'; // Maintain current width

                // If fixedThresholdScrollY hasn't been set yet, set it now.
                // This is the scroll position where the sidebar's bottom *just* touches the footer's top.
                if (fixedThresholdScrollY === -1) {
                    fixedThresholdScrollY = currentScrollY;
                    console.log("Saved fixed threshold scroll Y:", fixedThresholdScrollY);
                }
                
                console.log("Sidebar content top set to:", newTopPosition + "px");
            } else {
                // If it's already absolute, just ensure its top is correctly adjusted to the footer's top
                // This handles cases where the footer might move (e.g., dynamic content)
                const targetTopPosition = footerRect.top + currentScrollY - sidebarContentRect.height;
                if (parseFloat(sidebar_content.style.top) !== targetTopPosition) {
                    sidebar_content.style.top = targetTopPosition + 'px';
                    // console.log("Adjusting absolute position to:", targetTopPosition + "px");
                }
            }
        } else {
            // No overlap, revert to original position
            // Only revert if its position was previously changed by this script
            if (sidebar_content.style.position === 'absolute') {
                console.log("No overlap. Reverting .context-main position to original state.");
                sidebar_content.style.position = originalPosition;
                sidebar_content.style.top = originalTop;
                sidebar_content.style.left = originalLeft;
                sidebar_content.style.width = originalWidth;
                
                // Reset the threshold when it's no longer 'absolute' by our script
                fixedThresholdScrollY = -1;
            }
        }
    }

    // Run the check immediately on page load
    checkAndAdjustPosition();

    // Run the check on scroll and window resize to handle dynamic layouts
    window.addEventListener('scroll', checkAndAdjustPosition);
    window.addEventListener('resize', checkAndAdjustPosition);
});