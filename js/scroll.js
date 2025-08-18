// ===== Слайдер с предзагрузкой =====
const hero = document.querySelector('.hero__box');

const slides = [
  { src: "./image/desktop/hero_destop.webp", position: "center" },
  { src: "./image/desktop/repair.webp", position: "top" },
  { src: "./image/desktop/one.webp", position: "center" }
];

let index = 0;

// Предзагрузка изображений
slides.forEach(slide => {
  const img = new Image();
  img.src = slide.src;
});

// Установка фона
function setBackground(slide) {
  hero.style.backgroundImage = `url('${slide.src}')`;
  hero.style.backgroundPosition = slide.position;
}

// Инициализация первого слайда
setBackground(slides[index]);

// Смена слайдов
setInterval(() => {
  index = (index + 1) % slides.length;
  setBackground(slides[index]);
}, 4000);