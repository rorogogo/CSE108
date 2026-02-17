var modal = document.getElementById("myModal");
if (modal) {
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    var images = document.getElementsByClassName("gallery-img");

    for (var i = 0; i < images.length; i++) {
        images[i].onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        }
    }

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

const bgm = document.getElementById("bgm");
const btn = document.getElementById("musicToggle");

// Check if we have a saved time and state from a previous page
window.addEventListener("load", () => {
    const savedTime = localStorage.getItem("bgmTime");
    const isPlaying = localStorage.getItem("bgmPlaying") === "true";

    if (savedTime && bgm) {
        bgm.currentTime = parseFloat(savedTime);
    }

    if (isPlaying && bgm) {
        // Most browsers block autoplay, so we only try to play if they previously interacted
        bgm.play().catch(() => {
            console.log("Autoplay blocked. User must click 'Play' first.");
        });
        btn.innerHTML = "Pause Music ⏸";
    }
});

//Save the current time every second while it's playing
bgm.ontimeupdate = () => {
    localStorage.setItem("bgmTime", bgm.currentTime);
};

//Updated Toggle Button logic
btn.onclick = function() {
    if (bgm.paused) {
        bgm.play();
        btn.innerHTML = "Pause Music ⏸";
        localStorage.setItem("bgmPlaying", "true");
    } else {
        bgm.pause();
        btn.innerHTML = "Play Music ♫";
        localStorage.setItem("bgmPlaying", "false");
    }
};

