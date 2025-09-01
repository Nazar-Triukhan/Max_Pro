document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.services__video');

  videos.forEach(video => {
    // Коли відео завантажило дані
    video.addEventListener('loadeddata', () => {
      video.currentTime = 0;  // перший кадр
      video.pause();           // зупинка відео, щоб не автоплей
    });

    // Для деяких браузерів можна спробувати force load
    video.load();
  });
});
