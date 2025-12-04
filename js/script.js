document.addEventListener('DOMContentLoaded', function() {
  const menus = document.querySelectorAll('.menu-desplegable');
  menus.forEach(menu => {
    const submenu = menu.querySelector('.submenu');
    menu.addEventListener('mouseover', () => submenu && (submenu.style.display = 'block'));
    menu.addEventListener('mouseout', () => submenu && (submenu.style.display = 'none'));
  });

  const sliders = document.querySelectorAll('.slider');
  const intervals = new Map();

  function init(id) {
    const slider = document.getElementById(id);
    if (!slider) return;
    const slides = slider.children;
    let index = 0;

    function show(n) {
      index = (n + slides.length) % slides.length;
      slider.style.transform = `translateX(-${index * 100}%)`;
    }

    function start() {
      stop();
      const iv = setInterval(() => show(index + 1), 4000);
      intervals.set(id, iv);
    }

    function stop() {
      const existing = intervals.get(id);
      if (existing) clearInterval(existing);
      intervals.delete(id);
    }

    const prev = document.querySelector(`.btn-prev[data-slider="${id}"]`);
    const next = document.querySelector(`.btn-next[data-slider="${id}"]`);

    if (prev) prev.addEventListener('click', () => show(index - 1));
    if (next) next.addEventListener('click', () => show(index + 1));

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);

    show(0);
    start();
  }

  sliders.forEach(s => {
    const id = s.id;
    if (id) init(id);
  });
});
function showWelcomeMessage() {
    const msg = document.getElementById("welcome-message");
    if (!msg) return;

    const now = new Date();
    const hour = now.getHours();
    let greeting = "";

    if (hour < 12) greeting = "¡Buenos días! Bienvenido a El Mundo del Fútbol Inglés";
    else if (hour < 18) greeting = "¡Buenas tardes! Disfruta las últimas noticias del fútbol inglés";
    else greeting = "¡Buenas noches! Gracias por visitarnos";

    msg.textContent = greeting;
}

document.addEventListener("DOMContentLoaded", showWelcomeMessage);







