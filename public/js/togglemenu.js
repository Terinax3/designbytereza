function toggleMenu() {
    const nav = document.querySelector('.nav-links');
    const toggle = document.querySelector('.menu-toggle');
    const header = document.querySelector('header');

    nav.classList.toggle('show');
    toggle.classList.toggle('open');

    // Apply the black background only if on the home page
    if (header.classList.contains("home")) {
        header.classList.toggle("menu-open");
    }
}
