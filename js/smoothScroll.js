function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
  if (!targetElement) {
    console.error(`Элемент с указанным селектором {${target}} не найден.`);
    return;
  }

  var startPosition = window.scrollY; // Сохранение начальной позиции прокрутки
  var targetPosition =
    targetElement.getBoundingClientRect().top + startPosition;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) {
      startTime = currentTime;
    }
    var timeElapsed = currentTime - startTime;
    var scrollAmount = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, scrollAmount);
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  // Функция для плавности движения
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}
