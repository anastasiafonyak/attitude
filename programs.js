document.addEventListener('DOMContentLoaded', () => {
    // --- Меню ---
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

    // --- Карусель ---
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

    // --- Модальное окно ---
    const modal = document.getElementById('applyModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');
    const form = document.getElementById('applyForm');

    // --- МАСКА ТЕЛЕФОНА ---
    const phoneInput = document.getElementById('phone');
    const phoneMask = IMask(phoneInput, {
        mask: '+{7} (000) 000-00-00'
    });

    // --- ОГРАНИЧЕНИЕ ДАТЫ (только будущее) ---
    const dateInput = document.getElementById('date');
    const today = new Date();
    // Форматируем дату в YYYY-MM-DD для атрибута min
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;
    
    dateInput.setAttribute('min', minDate);

    // Открытие/закрытие модалки
    openBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        // При открытии сбрасываем ограничение даты на всякий случай (если сессия длинная)
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

    // --- Отправка формы ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Проверка, что телефон введен полностью
        if (phoneMask.unmaskedValue.length !== 11) {
            alert('Пожалуйста, введите полный номер телефона');
            return;
        }

        // Проверка даты (защита на случай, если пользователь ввел дату вручную)
        const selectedDate = new Date(dateInput.value);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Обнуляем время для корректного сравнения

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
            const response = await fetch('http://localhost:3000/api/apply', {
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
                phoneMask.value = ''; // Очищаем маску
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