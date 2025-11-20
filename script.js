function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener('DOMContentLoaded', function () {
  if (window.Typed) {
    const typed = new Typed('#typed-text', {
      strings: [
        'A Web Developer.',
        'A Web Designer.',
        'An Engineer.'
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true
    });
  }
});
