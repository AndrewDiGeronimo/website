function toggleMenu() {
    const navbar = document.getElementById("navbar");
    if (navbar.style.display === "none" || navbar.style.display === "") {
        navbar.style.display = "flex";
    } else {
        navbar.style.display = "none";
    }
}
function toggleMenu() {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle('show'); // Toggle class to animate
}