(function () {
  "use strict";

  const navMenu = document.querySelector('.nav-menu');
  const navToggle = document.querySelector('.nav-toggle');
  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('is-active');
    navToggle.classList.toggle('is-active');
  });
})();
