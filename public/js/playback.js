document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("background-video");

    // Ensure autoplay works on iOS
    video.play().catch(error => {
        console.log("Autoplay prevented. Trying to start video after user interaction.");
        document.addEventListener("click", () => video.play(), { once: true });
    });

    // Adjust playback rate AFTER the video has started
    video.addEventListener("canplay", () => {
        video.playbackRate = 0.8; // Super slow speed
    });
});
