const hero = document.querySelector('.hero__box');

const slides = [
  { src: "./image/desktop/hero_destop.webp", position: "center" },
  { src: "./image/desktop/repair.webp", position: "top" },
  { src: "./image/desktop/one.webp", position: "center" }
];

// 1️⃣ Попереднє завантаження всіх фонів
slides.forEach(slide => {
  const img = new Image();
  img.src = slide.src;
});

let index = 0;

function setBackground(slide) {
  hero.style.backgroundImage = `url('${slide.src}')`;
  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = slide.position;
  hero.style.backgroundRepeat = "no-repeat";
}

// 2️⃣ Встановлення першого фону
setBackground(slides[index]);

// 3️⃣ Зміна фону кожні 4 секунди
setInterval(() => {
  index = (index + 1) % slides.length;
  setBackground(slides[index]);
}, 4000);
