document.addEventListener('DOMContentLoaded', () => {
    // Make loader removal robust and compatible with different load timings
    (function() {
        const loader = document.getElementById('loader');

        function hideLoader() {
            if (!loader) return;
            // Add fade-out class (CSS handles opacity/visibility) then hide from flow after transition
            loader.classList.add('fade-out');
            setTimeout(() => {
                if (loader) loader.style.display = 'none';
            }, 600);
        }

        // If page already loaded, hide immediately; otherwise wait for load event
        if (document.readyState === 'complete') {
            hideLoader();
        } else {
            window.addEventListener('load', hideLoader);
        }

        // Mobile Menu Toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        const navUl = document.querySelector('nav ul');

        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                // Toggle both patterns used across pages
                menuToggle.classList.toggle('active');
                if (nav) nav.classList.toggle('active');
                if (navUl) navUl.classList.toggle('open');

                const spans = menuToggle.querySelectorAll('span');
                if (menuToggle.classList.contains('active')) {
                    if (spans[0]) spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (spans[1]) spans[1].style.opacity = '0';
                    if (spans[2]) spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    if (spans[0]) spans[0].style.transform = 'none';
                    if (spans[1]) spans[1].style.opacity = '1';
                    if (spans[2]) spans[2].style.transform = 'none';
                }
            });
        }

        // Handle internal link clicks for transition effect
        const links = document.querySelectorAll('nav a, .logo-container a');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('http')) {
                    e.preventDefault();

                    // Close mobile menu if open
                    if (menuToggle) menuToggle.classList.remove('active');
                    if (nav) nav.classList.remove('active');
                    if (navUl) navUl.classList.remove('open');

                    // Show loader then navigate (ensure loader is visible and not faded)
                    if (loader) {
                        loader.style.display = 'flex';
                        // Force reflow so removal of fade-out takes effect
                        void loader.offsetWidth;
                        loader.classList.remove('fade-out');
                    }

                    setTimeout(() => {
                        window.location.href = href;
                    }, 350);
                }
            });
        });
    })();
});
