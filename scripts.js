// Saved Theme Preferences 
document.addEventListener('DOMContentLoaded', function() {
    const storedTheme = localStorage.getItem('theme');

    if (document.body) {
        setTheme(storedTheme);
    }

    function setTheme(theme) {
        if (document.body) {
            document.body.setAttribute('data-theme', theme);
            darkModeIcon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon';
        }
    }
});

window.onload = function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navbar = document.querySelector('.navbar');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');
    const footer = document.querySelector('footer');

    // Hamburger Menu
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });
    

    // Dark Mode Toggle
    darkModeToggle.addEventListener('click', function () {
        // Toggle the theme between 'dark' and 'light'
        toggleTheme();
    });

    function toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        darkModeIcon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon';
    }
    
    // Dynamically adjust dark mode button position
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
    window.addEventListener('resize', adjustDarkModeButton);
    
    // Adjust button position on page load
    adjustDarkModeButton();
};