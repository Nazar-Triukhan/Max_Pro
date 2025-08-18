const hero = document.querySelector('.hero__box');

const slides = [
  { src: "../image/desktop/hero_destop.webp", position: "center" },
  { src: "../image/desktop/repair.webp", position: "top" },
  { src: "../image/desktop/one.webp", position: "center" }
];

let index = 0;

function setBackground(slide) {
  hero.style.backgroundImage = `url('${slide.src}')`;
  hero.style.backgroundSize = "cover";
  hero.style.backgroundPosition = slide.position;
  hero.style.backgroundRepeat = "no-repeat";
}

setBackground(slides[index]);

setInterval(() => {
  index = (index + 1) % slides.length;
  setBackground(slides[index]);
}, 4000);
