const box = document.querySelector('.networks__box');
const items = document.querySelector('.networks__items');

// сохраняем ширину оригинального списка
const originalWidth = items.scrollWidth;

// клонируем список ещё дважды
items.innerHTML = items.innerHTML + items.innerHTML + items.innerHTML + items.innerHTML + items.innerHTML + items.innerHTML + items.innerHTML + items.innerHTML + items.innerHTML;

// ставим скролл в середину (второй клон)
box.scrollLeft = originalWidth;

// обработчик скролла
box.addEventListener('scroll', () => {
  const scrollLeft = box.scrollLeft;

  // если ушли вправо — возвращаем в середину
  if (scrollLeft >= originalWidth * 5) {
    box.scrollLeft = scrollLeft - originalWidth;
  }

  // если ушли влево — возвращаем в середину
  if (scrollLeft <= originalWidth / 5) {
    box.scrollLeft = scrollLeft + originalWidth;
  }
});
// const track = document.querySelector('.networks__items');
// const speed = 1; // скорость прокрутки
// let pos = 0;

// // клонируем список
// track.innerHTML += track.innerHTML + track.innerHTML;
// const width = track.scrollWidth / 3;

// function animate() {
//   pos -= speed; // движение влево
//   if (pos <= -width) pos = 0;
//   track.style.transform = `translateX(${pos}px)`;
//   requestAnimationFrame(animate);
// }

// animate();
