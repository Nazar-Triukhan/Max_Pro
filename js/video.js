document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.services__video');

  videos.forEach(video => {
    video.preload = 'metadata';

    video.addEventListener('loadedmetadata', () => {
      video.currentTime = 0.1;
    });

    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);

      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        video.poster = url;
      });
    }, { once: true });
  });
});

