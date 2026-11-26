document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    const submenuToggle = document.getElementById('submenuToggle');
    const submenu = document.querySelector('.submenu');

    if(burgerMenu) {
        burgerMenu.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            burgerMenu.classList.toggle('open');
        });
    }

    if (submenuToggle) {
        submenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            submenu.classList.toggle('active');
            submenuToggle.style.transform = submenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    }

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            320: { spaceBetween: 10 },
            768: { spaceBetween: 30 }
        }
    });
});