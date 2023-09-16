// Целевой элемент, который вы хотите отслеживать
const targetElement = document.querySelector(".box");

const sections = document.querySelectorAll(".well");
let isBoxScrolling = false;
let isSectionScrolling = false;

// Подробнее кнопка
const aboutButton = document.querySelector(".about-site-button");
aboutButton.onclick = function () {
  if (!isBoxScrolling && !isSectionScrolling) {
    isBoxScrolling = true;
    smoothScroll(`#numbers`, 400);
    setTimeout(() => {
      isBoxScrolling = false;
    }, 400);
  }
};

// Сопровождение кнопка
const accompanimenButton = document.querySelector("#to-accompaniment");
accompanimenButton.onclick = function () {
  if (!isBoxScrolling && !isSectionScrolling) {
    isBoxScrolling = true;
    smoothScroll(`#accompaniment`, 400);
    setTimeout(() => {
      isBoxScrolling = false;
    }, 400);
  }
};
// Коллекторские услуги кнопка
const collectServiceButton = document.querySelector("#to-collector");
collectServiceButton.onclick = function () {
  if (!isBoxScrolling && !isSectionScrolling) {
    isBoxScrolling = true;
    smoothScroll(`#collectService`, 400);
    setTimeout(() => {
      isBoxScrolling = false;
    }, 400);
  }
};
// Коллекторские услуги кнопка
const pretServiceButton = document.querySelector("#to-pret");
pretServiceButton.onclick = function () {
  if (!isBoxScrolling && !isSectionScrolling) {
    isBoxScrolling = true;
    smoothScroll(`#pretService`, 400);
    setTimeout(() => {
      isBoxScrolling = false;
    }, 400);
  }
};

// Флаги для отслеживания скролла с помощью интеракции пользователя
let isUserScrolling = false;

// Обработчик события колеса мыши
window.addEventListener("wheel", () => {
  isUserScrolling = true;
  setTimeout(() => {
    isUserScrolling = false;
  }, 400); // Установите задержку, если необходимо
});

// Обработчик события сенсорного взаимодействия (например, свайп на сенсорном устройстве)
window.addEventListener("touchmove", () => {
  isUserScrolling = true;
  setTimeout(() => {
    isUserScrolling = false;
  }, 400); // Установите задержку, если необходимо
});
sections.forEach((section, index) => {
  const dataAttr = `data-section-${index}`;
  section.setAttribute("data-scroll-selector", dataAttr);
});
// Функция обратного вызова для Intersection Observer для .box
const boxCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Элемент попал в зону видимости
      // smoothScroll(".box", 400);
      console.log("Элемент .box попал в зону видимости");
      // здесь получи селектор entry, т.к как аргумент функции - css селектор, например '.check', но у тебя это будет атрибут с индексом
    } else {
      // Элемент покинул зону видимости
      console.log("Элемент .box покинул зону видимости");
    }
  });
};

// Функция обратного вызова для Intersection Observer для .sections
const sectionCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && isUserScrolling) {
      // Элемент попал в зону видимости и скролл был запущен пользовательской интеракцией
      console.log(`Элемент .section попал в зону видимости: ${entry.target}`);
      const scrollSelector = entry.target.getAttribute("data-scroll-selector");
      console.log(`scroll до [data-scroll-selector=${scrollSelector}]`);
      if (!isBoxScrolling && !isSectionScrolling) {
        isSectionScrolling = true;
        setTimeout(() => {
          smoothScroll(`[data-scroll-selector=${scrollSelector}]`, 400);
          isSectionScrolling = false;
        }, 50); // Установите задержку равную времени анимации в smoothScroll
      }
    } else {
      // Элемент покинул зону видимости или скролл не запущен пользовательской интеракцией
      console.log(`Элемент .section покинул зону видимости: `);
      console.log(entry.target);
      if (isSectionScrolling) {
        isSectionScrolling = false;
      }
    }
  });
};

// Настройка Intersection Observer для .box
const boxOptions = {
  root: null, // null означает viewport
  rootMargin: "0px", // отступы от границ вьюпорта
  threshold: 0.03, // порог для срабатывания (0.5 означает, что более 50% элемента должно быть видимо)
};

// Настройка Intersection Observer для .sections
const sectionOptions = {
  root: null, // null означает viewport
  rootMargin: "0px", // отступы от границ вьюпорта
  threshold: 0.03, // порог для срабатывания (0.5 означает, что более 50% элемента должно быть видимо)
};

// Создание экземпляра Intersection Observer для .box
const boxObserver = new IntersectionObserver(boxCallback, boxOptions);

// Создание экземпляра Intersection Observer для .sections
const sectionObserver = new IntersectionObserver(
  sectionCallback,
  sectionOptions
);

// Начать наблюдение за .box
boxObserver.observe(targetElement);

// Начать наблюдение за всеми .sections

sections.forEach((section) => {
  sectionObserver.observe(section);
});
// Добавьте обработчик события scroll для отслеживания завершения скролла
let scrollTimeout;

// let lastScrollPosition = window.scrollY;
// window.addEventListener("scroll", () => {
//   clearTimeout(scrollTimeout);
//   scrollTimeout = setTimeout(() => {
//     if (!isBoxScrolling && !isSectionScrolling) {
//       const currentScrollPosition = window.scrollY;
//       const scrollDirection =
//         currentScrollPosition > lastScrollPosition ? "down" : "up";

//       // Определите ближайшую видимую секцию
//       let closestSection = null;
//       let closestDistance = Infinity;
//       sections.forEach((section) => {
//         const rect = section.getBoundingClientRect();
//         const sectionTop = rect.top;
//         const sectionHeight = rect.height;
//         const isVisible =
//           scrollDirection === "down"
//             ? sectionTop <= window.innerHeight * 0.6
//             : sectionTop >= -sectionHeight * 0.4;

//         if (isVisible) {
//           const visiblePercentage =
//             scrollDirection === "down"
//               ? Math.min(1, (sectionHeight + sectionTop) / sectionHeight)
//               : Math.min(1, (window.innerHeight - sectionTop) / sectionHeight);

//           if (visiblePercentage >= 0.4 && sectionTop < closestDistance) {
//             closestSection = section;
//             closestDistance = sectionTop;
//           }
//         }
//       });

//       if (closestSection) {
//         const scrollSelector = closestSection.getAttribute(
//           "data-scroll-selector"
//         );
//         smoothScroll(`[data-scroll-selector=${scrollSelector}]`, 400);
//       }
//       // if (closestSection) {
//       //   const scrollSelector = closestSection.getAttribute(
//       //     "data-scroll-selector"
//       //   );
//       //   smoothScroll(`[data-scroll-selector=${scrollSelector}]`, 400);
//       //   console.log(scrollDirection);
//       //   if (scrollSelector != "data-section-0") {
//       //     smoothScroll(`[data-scroll-selector=${scrollSelector}]`, 400);
//       //   } else if (scrollDirection === "up") {
//       //     // Если скролл идет вверх и мы близко к верхней границе страницы,
//       //     // то скроллим до #header
//       //     console.log(scrollDirection);
//       //     smoothScroll("nav", 400);
//       //   }
//       // }

//       lastScrollPosition = currentScrollPosition; // Обновляем lastScrollPosition
//     }
//   }, 400); // Установите задержку, чтобы определить завершение скролла
// });
