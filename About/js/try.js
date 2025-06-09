$(window).scroll(function() {
    var sidebar = $('.context');
    var footer = $('.site-footer');

    // Get positions
    var sidebarOffset = sidebar.offset().top;
    var sidebarHeight = sidebar.outerHeight();
    var footerOffset = footer.offset().top;

    // Calculate where the sidebar should stop
    // This is where the bottom of the sidebar aligns with the top of the footer
    var stopPoint = footerOffset - sidebarHeight;

    // Current scroll position
    var scrollTop = $(window).scrollTop();

    if (scrollTop >= stopPoint) {
        // If sidebar would overlap footer, make it absolute to stop
        sidebar.css({
            'position': 'absolute',
            'top': stopPoint // Set top relative to its parent
            // If you want it to align with the bottom of the main content area,
            // you might need to adjust 'top' further or set 'bottom: 0' and its parent 'position: relative'
        });
    } else {
        // Otherwise, keep it fixed
        sidebar.css({
            'position': 'fixed',
            'top': '20px' // Or whatever its initial fixed top is
        });
    }
});