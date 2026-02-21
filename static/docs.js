const buttons = document.querySelectorAll(".show_btn");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const content = btn.nextElementSibling;
        content.classList.toggle("show");
        btn.textContent = content.classList.contains("show") ? "Hide" : "Show";
    });
});
