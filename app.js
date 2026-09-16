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
    const emailInput =
      root.querySelector('input[type="email"]') || root.querySelector("#email");
    const errorMsg = root.querySelector(".error-msg");
    const emailSubmit =
      root.querySelector(".email-btn") || root.querySelector("#email-btn");

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

// function contactFormValidate() {
//   // Другой класс формы
//   const form = document.querySelector(".contact__form");
//   // Если этой формы нет на текущей странице — выходим!
//   if (!form) return;

//   // Ищем элементы именно этой новой формы
//   const nameInput = form.querySelector("#name");
//   const emailAdress = form.querySelector("#emailAdress");
//   const messageText = form.querySelector("#message");
//   const submitBtn = form.querySelector("button[type='submit']");
//   // console.log(nameInput, emailAdress, messageText, submitBtn);

//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const isRequiredValid = checkRequired([
//       nameInput,
//       emailAdress,
//       messageText,
//     ]);

//     let isEmailValid = isRequiredValid;
//     if (isRequiredValid) {
//       const isNameInputValid = checkLength(nameInput, 3, 15);
//       const isEmailValid = checkEmail(emailAdress);
//       const isMessageValid = checkLength(messageText, 3);

//       isFormValid = isNameInputValid && isEmailValid && isMessageValid;

//       if (isFormValid) {
//         document.querySelectorAll(".form-group").forEach((group) => {
//           group.classList = "form-group";
//         });
//       }
//     }

//     // Проверка Email
//     function checkEmail(emailAdress) {
//       const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//       if (mailRegex.test(emailAdress.value.trim())) {
//         showSuccess(emailAdress);
//         return true;
//       } else {
//         showError(emailAdress, `Please use a valid email address`);
//         return false;
//       }
//     }

//     // Проверка имени
//     function checkLength(input, min, max) {
//       if (input.value.length < min) {
//         showError(input, `Name must be at least ${min} charters`);
//         return false;
//       } else if (input.value.length > max) {
//         showError(input, `Name must be less than ${max} charters`);
//         return false;
//       } else {
//         showSuccess(input);
//         return true;
//       }
//     }

//     function checkRequired(inputArray) {
//       let isValid = true;

//       inputArray.forEach((input) => {
//         if (input.value.trim() === "") {
//           showError(input, `This field can't be empty`);
//           isValid = false;
//         } else {
//           showSuccess(input);
//         }
//       });
//       return isValid;
//     }

//     function showError(input, message) {
//       const formGroup = input.parentElement;
//       formGroup.className = "form-group error";
//       const small = formGroup.querySelector("small");
//       small.innerText = message;
//     }

//     function showSuccess(input) {
//       const formGroup = input.parentElement;
//       // добавляем класс success
//       formGroup.className = "form-group success";
//     }
//   });
// }


// contactFormValidate();

function contactFormValidate() {
  const form = document.querySelector(".contact__form");
  if (!form) return;

  const nameInput = form.querySelector("#name");
  const emailAdress = form.querySelector("#emailAdress");
  const messageText = form.querySelector("#message");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // 1. Сначала проверяем обязательные поля на пустоту
    const isRequiredValid = checkRequired([nameInput, emailAdress, messageText]);

    // 2. Если все поля заполнены, делаем детальную валидацию формата
    if (isRequiredValid) {
      const isNameInputValid = checkLength(nameInput, 3, 15, "Name");
      const isEmailValid = checkEmail(emailAdress);
      // Передаем min=3, max=Infinity (чтобы сообщение могло быть любой длины) и имя поля "Message"
      const isMessageValid = checkLength(messageText, 3, Infinity, "Message");

      // ИСПРАВЛЕНО: заменили минус на знак равенства и добавили const
      const isFormValid = isNameInputValid && isEmailValid && isMessageValid;

      if (isFormValid) {
        alert("Form submitted successfully!"); // Для теста
        
        // Очищаем форму и убираем классы успехов/ошибок
        form.reset();
        document.querySelectorAll(".form-group").forEach((group) => {
          group.classList.remove("error", "success");
        });
      }
    }
  });

  function checkEmail(emailAdress) {
    const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (mailRegex.test(emailAdress.value.trim())) {
      showSuccess(emailAdress);
      return true;
    } else {
      showError(emailAdress, `Please use a valid email address`);
      return false;
    }
  }

  // ИСПРАВЛЕНО: добавили аргумент fieldName для красивого вывода ошибок
  function checkLength(input, min, max, fieldName) {
    const valueLength = input.value.trim().length;

    if (valueLength < min) {
      showError(input, `${fieldName} must be at least ${min} characters`);
      return false;
    } else if (valueLength > max) {
      showError(input, `${fieldName} must be less than ${max} characters`);
      return false;
    } else {
      showSuccess(input);
      return true;
    }
  }

  function checkRequired(inputArray) {
    let isValid = true;

    inputArray.forEach((input) => {
      if (input.value.trim() === "") {
        showError(input, `This field can't be empty`);
        isValid = false;
      } else {
        showSuccess(input);
      }
    });
    return isValid;
  }

  function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group error";
    const small = formGroup.querySelector("small");
    small.innerText = message;
  }

  function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = "form-group success";
  }
}

contactFormValidate();
