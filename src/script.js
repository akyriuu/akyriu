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
