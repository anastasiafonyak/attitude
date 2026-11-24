document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    const submenuToggle = document.getElementById('submenuToggle');
    const submenu = document.querySelector('.submenu');

    burgerMenu.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        burgerMenu.classList.toggle('open');
    });

    if (submenuToggle) {
        submenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            submenu.classList.toggle('active');
            
            if (submenu.classList.contains('active')) {
                submenuToggle.style.transform = 'rotate(180deg)';
            } else {
                submenuToggle.style.transform = 'rotate(0deg)';
            }
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
            320: {
                spaceBetween: 10
            },
            768: {
                spaceBetween: 30
            }
        }
    });
});