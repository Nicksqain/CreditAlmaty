async function animateOnIntersection(
  elements,
  animationIn,
  animationOut,
  delay,
  duration,
  delayBetweenElements
) {
  let observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  let observer = new IntersectionObserver(async (entries, observer) => {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const element = entry.target;

      if (entry.isIntersecting) {
        if (i > 0) {
          // Добавляем задержку между видимыми элементами
          if (delayBetweenElements) {
            await new Promise((resolve) =>
              setTimeout(resolve, delayBetweenElements)
            );
          }
        }

        // При попадании в область видимости
        element.style.transition = `all ${duration}ms ease ${delay}ms`;

        if (animationIn) {
          for (const [key, value] of Object.entries(animationIn)) {
            element.style[key] = value;
          }
        }
      } else {
        // При выходе из области видимости
        element.style.transition = `all ${duration}ms ease ${delay}ms`;

        if (animationOut) {
          for (const [key, value] of Object.entries(animationOut)) {
            element.style[key] = value;
          }
        }
      }
    }
  }, observerOptions);

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Пример использования с задержкой между элементами только для видимых элементов

// Текст "О компании"
const companyParagraphes = document.querySelectorAll(".company-facts .fact p");
animateOnIntersection(
  companyParagraphes,
  { transform: "translateY(0)", opacity: 1 }, // Анимация при попадании
  { transform: "translateY(70px)", opacity: 0.5 }, // Анимация при выходе
  100, // Задержка перед началом анимации
  700, // Продолжительность анимации в миллисекундах
  150 // Задержка между видимыми элементами
);

// Цифровая статистика блока "Наша статистика" (Параграфы)
const statParagraphes = document.querySelectorAll(".figures .figure .text p");
animateOnIntersection(
  statParagraphes,
  {
    transform: "translatex(0) ",
    opacity: 1,
  }, // Анимация при попадании
  {
    transform: "translatex(50px) ",
    opacity: 0.5,
  }, // Анимация при выходе
  100, // Задержка перед началом анимации
  300 // Продолжительность анимации в миллисекундах
);

// Цифровая статистика блока "Наша статистика" (ЗАГОЛОВКИ)
const statHeaders = document.querySelectorAll(".figures .figure .text h2");
animateOnIntersection(
  statHeaders,
  {
    transform: "translateY(0) ",
    opacity: 1,
  }, // Анимация при попадании
  {
    transform: "translateY(70px) ",
    opacity: 0,
  }, // Анимация при выходе
  200, // Задержка перед началом анимации
  700 // Продолжительность анимации в миллисекундах
);

// Чекбоксы
const checkboxes = document.querySelectorAll(
  ".accompaniment > .right .list .item"
);
animateOnIntersection(
  checkboxes,
  { transform: "translateX(0)", opacity: 1 }, // Анимация при попадании
  { transform: "translateX(-50px)", opacity: 0 }, // Анимация при выходе
  150, // Задержка перед началом анимации
  700 // Продолжительность анимации в миллисекундах
);

// Иконки направлений
const directionicons = document.querySelectorAll(
  ".directions .direction .text svg"
);
animateOnIntersection(
  directionicons,
  { transform: " scale(1)", opacity: 1, transformOrigin: "center" }, // Анимация при попадании
  { transform: "scale(0.3)", opacity: 0.5 }, // Анимация при выходе
  100, // Задержка перед началом анимации
  500,
  100 // Продолжительность анимации в миллисекундах// Задержка между видимыми элементами
);

// Текст направлений
const directionTitles = document.querySelectorAll(".directions .direction h2");
animateOnIntersection(
  directionTitles,
  { transformOrigin: "center", transform: "translate(0)", opacity: 1 }, // Анимация при попадании
  { transformOrigin: "center", transform: "translate(-50px)", opacity: 0.5 }, // Анимация при выходе
  100, // Задержка перед началом анимации
  500,
  100 // Продолжительность анимации в миллисекундах// Задержка между видимыми элементами
);
