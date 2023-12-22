document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger-menu');
    const navbar = document.querySelector('.navbar');

    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');

    const footer = document.querySelector('footer');

    // Set initial theme based on system preference or saved preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    const theme = savedTheme ? savedTheme : (prefersDarkMode ? 'dark' : 'light');
    setTheme(theme);

    //Hamburger Menu
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    //Dark Mode Toggle
    darkModeToggle.addEventListener('click', function () {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        darkModeIcon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon';
    }
    
    //Dynamically adjust darkmode button by position
    function adjustDarkModeButton() {
        const footerRect = footer.getBoundingClientRect();
        const fromBottom = window.innerHeight - footerRect.top;
        const footerVisible = fromBottom > 20 && fromBottom < window.innerHeight;
    
        if (footerVisible) {
            const newPositionAboveFooter = window.innerHeight - footerRect.top + 10;
            darkModeToggle.style.bottom = `${newPositionAboveFooter}px`;
        } else {
            darkModeToggle.style.bottom = '30px';
        }
    }

    let ticking = false;
    window.addEventListener('scroll', function(e) {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                adjustDarkModeButton();
                ticking = false;
            });
    
            ticking = true;
        }
    });
    window.addEventListener('scroll', adjustDarkModeButton);
    adjustDarkModeButton(); // Adjust button position on load
});