(function () {
  "use strict";

  const navMenu = document.querySelector('.nav-menu');
  const navToggle = document.querySelector('.nav-toggle');
  navToggle.addEventListener('click', function () {
    navMenu.classList.toggle('is-active');
    navToggle.classList.toggle('is-active');
  });

  const mySwiper = new Swiper('.swiper-container', {
    autoplay: 5000,
    loop: true,
    pagination: '.swiper-pagination',
    paginationClickable: true,
    spaceBetween: 30
  })
})();
