const body = document.querySelector("body");
const buttons = document.querySelectorAll(".menu__button");
const open = document.querySelector(".open__button");
const close = document.querySelector(".close__button");
// console.log(body, buttons, open, close);
function menuToggle() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const isActive = body.classList.toggle("menu__active");
      if (isActive) {
        open.setAttribute("aria-expanded", "true");
      } else {
        open.setAttribute("aria-expanded", "false");
      }
    });
  });
}

function escapeMenu() {
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && body.classList.contains("menu__active")) {
      body.classList.remove("menu__active");
      open.setAttribute("aria-expanded", "false");
    }
  });
}
document.addEventListener("DOMContentLoaded", () => {
  menuToggle();
  escapeMenu();
});

function emailValidate() {
  const root = document.querySelector(".form__email");
  if (!root) return;

  const emailInput = root.querySelector("#email");
  const errorMsg = root.querySelector(".error-msg");
  const emailSubmit = root.querySelector("#email-btn");

  // Улучшенное регулярное выражение для проверки email
  const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Функция для скрытия ошибки
  function setValid() {
    errorMsg.style.display = "none";
    emailInput.style.borderColor = ""; // Сбрасываем к исходному стилю из CSS
  }

  // Функция для показа ошибки
  function setInvalid() {
    errorMsg.style.display = "block";
    emailInput.style.borderColor = "red"; // Окрашиваем рамку в красный
    // emailInput.style.borderColor = 'hsl(0, 100%, 50%)';
  }

  // Проверка при каждом вводе символа
  emailInput.addEventListener("input", () => {
    // Если поле пустое или email корректный — скрываем ошибку
    if (emailInput.value === "" || mailRegex.test(emailInput.value)) {
      setValid();
    } else {
      setInvalid();
    }
  });

  // Проверка при клике на кнопку отправки
  emailSubmit.addEventListener("click", (event) => {
    // Отменяем отправку формы для проверки
    event.preventDefault();

    // Если email не подходит под регулярное выражение
    if (!mailRegex.test(emailInput.value)) {
      setInvalid();
    } else {
      setValid();
      // Здесь можно вызвать root.submit(), если нужно отправить форму
    }
  });
}

emailValidate();
