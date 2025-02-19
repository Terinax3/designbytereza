document.addEventListener("DOMContentLoaded", function () {
    const returnToTopButton = document.getElementById("return-to-top");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 120) {
            returnToTopButton.classList.add("visible");
        } else {
            returnToTopButton.classList.remove("visible");
        }
    });

    returnToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
