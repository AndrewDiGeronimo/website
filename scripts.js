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

// Dynamically load the gtag.js script
var gtagScript = document.createElement('script');
gtagScript.async = true;
gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-9Q5HKS7H25';
document.head.appendChild(gtagScript);

// Google Analytics tracking code
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', 'G-9Q5HKS7H25');

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


    // Play project video on load
    function loadVideo() {
        const videoContainer = document.getElementById('projectVideo');
        const thumbnail = document.getElementById('projectThumbnail');
        
        // Create video element
        const video = document.createElement('video');
        video.setAttribute('width', '100%');
        video.setAttribute('controls', '');
        video.src = '/Media/Appdemo.m4v';

        // Append the video
        videoContainer.appendChild(video);
        

        // Delay switching from thumbnail to video
        setTimeout(() => {
            videoContainer.style.display = 'block';
            thumbnail.style.display = 'none';

        }, 2000); // 2000 milliseconds = 2 seconds
    }

    loadVideo();
};

//Dynamic Fade In Effect
function checkVisibility() {
    const elements = document.querySelectorAll('.hidden-content');
    
    elements.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight - 200) {
        el.classList.add('visible-content');
      } 
    });
  }
  
  // Check visibility on scroll
  document.addEventListener('scroll', checkVisibility);
  
  // Check visibility on page load
  document.addEventListener('DOMContentLoaded', () => {
    checkVisibility();
  });