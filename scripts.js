// Saved Theme Preferences 
document.addEventListener('DOMContentLoaded', function() {
    const storedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    setTheme(storedTheme);

    function setTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        // Ensure darkModeIcon is defined and then update its class
        if (darkModeIcon) {
            darkModeIcon.className = theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon';
        }
    }
});

window.onload = function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navbar = document.querySelector('.navbar');
    const navBlur = document.querySelector('.nav-blur');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeIcon = document.getElementById('darkModeIcon');

    // Hamburger Menu
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
        navBlur.classList.toggle('active');
    });
    
    // Close hamburger menu on outside click
    document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      navbar.classList.remove('active');
      navBlur.classList.remove('active');
    }
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
        const footerRect = document.querySelector('footer').getBoundingClientRect();
        const fromBottom = window.innerHeight - footerRect.top;
        const footerVisible = fromBottom > 20 && fromBottom < window.innerHeight;
        const rightMargin = Math.max(window.innerWidth - footerRect.right);
    
        if (footerVisible) {
            const newPositionAboveFooter = fromBottom - -20;
            darkModeToggle.style.bottom = `${newPositionAboveFooter}px`;
        } else {
            darkModeToggle.style.bottom = '30px'; // Default position
        }
        darkModeToggle.style.right = `${rightMargin}px`; // Adjust horizontal position
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


    //Contact functions
    document.getElementById('copy-button').addEventListener('click', function() {
        navigator.clipboard.writeText('contact@andrewdigeronimo.com').then(() => {
            alert('Email copied to clipboard!');
        }).catch(err => {
            console.error('Error in copying text: ', err);
        });
    });
    
    document.getElementById('mail-button').addEventListener('click', function() {
        window.location.href = 'mailto:contact@andrewdigeronimo.com';
    });
};