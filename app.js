
const body = document.querySelector("body");
const openButton = document.querySelector(".open__button");
const closeButton = document.querySelector(".close__button");

// Функция для обновления aria-атрибутов на ВСЕХ кнопках управления меню
function updateMenuAttributes(isOpen) {
  const state = isOpen ? "true" : "false";
  openButton.setAttribute("aria-expanded", state);
  closeButton.setAttribute("aria-expanded", state);
}

function initMenu() {
  // Закрытие и открытие по клику на соответствующие кнопки
  openButton.addEventListener("click", () => {
    body.classList.add("menu__active");
    updateMenuAttributes(true);
    // А11у-бонус: переводим фокус на кнопку закрытия или первую ссылку внутри меню
    closeButton.focus(); 
  });

  closeButton.addEventListener("click", () => {
    body.classList.remove("menu__active");
    updateMenuAttributes(false);
    // А11у-бонус: возвращаем фокус на кнопку открытия, чтобы пользователь не потерялся
    openButton.focus(); 
  });

  // Закрытие по кнопке Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && body.classList.contains("menu__active")) {
      body.classList.remove("menu__active");
      updateMenuAttributes(false);
      openButton.focus(); // Возвращаем фокус
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
});

function emailValidate() {
  const roots = document.querySelectorAll(".form__email");
  if (!roots.length) return; // Проверяем, нашлись ли формы вообще

  roots.forEach((root) => {
    // Используем querySelector, так как внутри КАЖДОЙ формы только ОДИН input, ОДНА ошибка и ОДНА кнопка
    const emailInput = root.querySelector('input[type="email"]') || root.querySelector('#email');
    const errorMsg = root.querySelector(".error-msg");
    const emailSubmit = root.querySelector(".email-btn") || root.querySelector("#email-btn");

    // Защита: если в какой-то из форм не хватает элементов, пропускаем её, чтобы не было ошибок
    if (!emailInput || !errorMsg || !emailSubmit) return;

    // Регулярное выражение для проверки email
    const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Функция для скрытия ошибки
    function setValid() {
      errorMsg.style.display = "none";
      emailInput.style.borderColor = ""; 
    }

    // Функция для показа ошибки
    function setInvalid() {
      errorMsg.style.display = "block";
      emailInput.style.borderColor = "red"; 
    }

    // Проверка при каждом вводе символа
    emailInput.addEventListener("input", () => {
      if (emailInput.value === "" || mailRegex.test(emailInput.value)) {
        setValid();
      } else {
        setInvalid();
      }
    });

    // Проверка при клике на кнопку отправки (теперь без forEach, так как кнопка одна внутри текущей формы)
    emailSubmit.addEventListener("click", (event) => {
      event.preventDefault(); // Отменяем отправку формы для проверки

      if (!mailRegex.test(emailInput.value)) {
        setInvalid();
      } else {
        setValid();
        // Здесь можно отправить конкретную форму: root.submit();
      }
    });
  });
}

emailValidate();
