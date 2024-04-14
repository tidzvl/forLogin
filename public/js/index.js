const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const toggle = body.querySelector(".toggle");
const searchBtn = body.querySelector(".search-box");

toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

window.addEventListener("load", () => {
    const loader = document.querySelector(".loading");
    loader.classList.add("loading-hidden");
    loader.addEventListener("transitioned", () => {
        document.body.removeChild("loading");
    });
});