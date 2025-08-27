(() => {
  const toggleBtn = document.querySelector("[data-mobile-toggle]");
  const mobileMenu = document.querySelector("[data-mobile]");

  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("is-hidden");
    // document.body.classList.toggle("no-scroll");
  });
})();
