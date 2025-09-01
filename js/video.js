const videos = document.querySelectorAll('.services__video');

videos.forEach(video => {
  video.addEventListener('loadeddata', () => {
    video.currentTime = 0;  // перейти на перший кадр
    video.pause();           // зупинити відео, щоб не автоплей
  });
});
  