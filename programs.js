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

    var swiper = new Swiper(".auto-swiper", {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: { spaceBetween: 10 },
            768: { spaceBetween: 20 }
        }
    });

    const modal = document.getElementById('applyModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    const form = document.getElementById('applyForm');

    const phoneInput = document.getElementById('phone');
    const phoneMask = IMask(phoneInput, {
        mask: '+{7} (000) 000-00-00'
    });

    const dateInput = document.getElementById('date');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;
    
    dateInput.setAttribute('min', minDate);

    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        const currentDate = new Date();
        const currentYyyy = currentDate.getFullYear();
        const currentMm = String(currentDate.getMonth() + 1).padStart(2, '0');
        const currentDd = String(currentDate.getDate()).padStart(2, '0');
        dateInput.setAttribute('min', `${currentYyyy}-${currentMm}-${currentDd}`);
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (phoneMask.unmaskedValue.length !== 11) {
            alert('Пожалуйста, введите полный номер телефона');
            return;
        }

        const selectedDate = new Date(dateInput.value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (selectedDate < currentDate) {
            alert('Нельзя записаться на прошедшую дату. Выберите будущую дату.');
            return;
        }

        const formData = {
            name: document.getElementById('name').value,
            phone: phoneInput.value,
            date: dateInput.value,
            program: document.getElementById('programSelect').value
        };

        try {
            const response = await fetch('/api/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Вы успешно записаны! Мы свяжемся с вами.');
                form.reset();
                phoneMask.value = '';
                modal.style.display = 'none';
            } else {
                alert('Ошибка: ' + result.error);
            }
        } catch (error) {
            console.error('Ошибка отправки:', error);
            alert('Не удалось отправить заявку. Проверьте соединение с сервером.');
        }
    });
});