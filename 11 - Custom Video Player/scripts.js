const video = document.querySelector('video');
const playButton = document.querySelector('.player__button');
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackSpeedSlider = document.querySelector('input[name="playbackRate"]');
const progress = document.querySelector('.progress__filled');

let isPlaying = false;
let videoTime = 0;

function fillProgress() {
  videoTime = (video.currentTime / video.duration) * 100;
  progress.style.flexBasis = `${videoTime}%`;
}

function playVideo() {
  if (!isPlaying) {
    video.play();
    isPlaying = true;
    playButton.innerHTML = `<button class="player__button toggle" title="Toggle Play">| |</button>`
    fillProgress()
  } else {
    video.pause();
    isPlaying = false;
    playButton.innerHTML = `<button class="player__button toggle" title="Toggle Play">►</button>`
  }
}

function changeVolume(e) {
  video.volume = e.target.value;
}

function changePlaybackSpeed(e) {
  video.playbackRate = e.target.value;
}

video.addEventListener('click', playVideo);
video.addEventListener('timeupdate', fillProgress)
playButton.addEventListener('click', playVideo);
volumeSlider.addEventListener('mousemove', changeVolume);
playbackSpeedSlider.addEventListener('mousemove', changePlaybackSpeed);