const video = document.querySelector('video');
const playButton = document.querySelector('.toggle');
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackSpeedSlider = document.querySelector('input[name="playbackRate"]');
const progressContainer = document.querySelector('.progress')
const progress = document.querySelector('.progress__filled');
const back10SecondsButton = document.querySelector('button[data-skip="-10"]');
const forward25SecondsButton = document.querySelector('button[data-skip="25"]');

let isPlaying = false;
let videoTime = 0;
let isForwardClicked = false;
let isBackwardClicked = false;
let isProgressClicked = false;

function clickProgressBar(e) {
  videoTime = (e.offsetX / progressContainer.offsetWidth) * video.duration;
  video.currentTime = videoTime
}

function progressBarFunction() {
  if (isForwardClicked) {
    videoTime = ((video.currentTime + Number(forward25SecondsButton.dataset.skip)) / video.duration) * 100;
    video.currentTime = video.currentTime + 25;
    isForwardClicked = false;
  } else if (isBackwardClicked) {
    videoTime = ((video.currentTime - Number(back10SecondsButton.dataset.skip)) / video.duration) * 100;
    video.currentTime = video.currentTime - 10;
    isBackwardClicked = false;
  } else {
    videoTime = (video.currentTime / video.duration) * 100;
  }

  if (video.ended) {
    video.play()
  }
  
  progress.style.flexBasis = `${videoTime}%`;
}

function playVideo() {
  if (!isPlaying) {
    video.play();
    isPlaying = true;
    playButton.innerHTML = `<button class="player__button toggle" title="Toggle Play">| |</button>`
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
video.addEventListener('timeupdate', progressBarFunction)

playButton.addEventListener('click', playVideo);
volumeSlider.addEventListener('mousemove', changeVolume);
playbackSpeedSlider.addEventListener('mousemove', changePlaybackSpeed);

back10SecondsButton.addEventListener('mousedown', () => isBackwardClicked = true);
back10SecondsButton.addEventListener('click', progressBarFunction);

forward25SecondsButton.addEventListener('mousedown', () => isForwardClicked = true);
forward25SecondsButton.addEventListener('click', progressBarFunction);

progressContainer.addEventListener('click', clickProgressBar)