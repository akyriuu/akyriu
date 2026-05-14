const preview = document.createElement("div");
preview.className = "project-preview";
preview.innerHTML = '<img src="" alt="" />';
document.body.appendChild(preview);

document.querySelectorAll("[data-preview]").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    preview.querySelector("img").src = link.dataset.preview;
    preview.classList.add("visible");
  });
  link.addEventListener("mousemove", (e) => {
    preview.style.left = e.clientX + 20 + "px";
    preview.style.top = e.clientY - 60 + "px";
  });
  link.addEventListener("mouseleave", () => {
    preview.classList.remove("visible");
  });
});

async function fetchNowPlaying() {
  const el = document.getElementById("now-playing");
  if (!el) return;
  try {
    const res = await fetch(
      "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Akyriu&api_key=d4c7c3bd47f07faa169dc2f165d3357f&format=json&limit=1",
    );
    const data = await res.json();
    const track = data.recenttracks.track[0];
    const isLive = track?.["@attr"]?.nowplaying === "true";

    if (isLive) {
      el.querySelector(".np-dot").style.background = "#1db954";
      el.querySelector(".np-text").textContent =
        `${track.artist["#text"]} — ${track.name}`;
    } else {
      el.querySelector(".np-dot").style.background = "#444";
      el.querySelector(".np-text").textContent = "nada tocando agora";
    }
  } catch {
    el.querySelector(".np-text").textContent = "erro ao carregar";
  }
}

fetchNowPlaying();
