const video = document.querySelector('video');
const playButton = document.querySelector('.toggle');
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackSpeedSlider = document.querySelector('input[name="playbackRate"]');
const progress = document.querySelector('.progress__filled');
const back10Seconds = document.querySelector('button[data-skip="-10"]');
const forward25Seconds = document.querySelector('button[data-skip="25"]');

let isPlaying = false;
let videoTime = 0;
let isForwardClicked = false;
let isBackwardClicked = false;

function progressBarFunction() {
  console.log(video.paused);
  if (isForwardClicked) {
    videoTime = ((video.currentTime + Number(forward25Seconds.dataset.skip)) / video.duration) * 100;
    video.currentTime = video.currentTime + 25;
    isForwardClicked = false;
  } else if (isBackwardClicked) {
    videoTime = ((video.currentTime - Number(back10Seconds.dataset.skip)) / video.duration) * 100;
    video.currentTime = video.currentTime - 10;
    isBackwardClicked = false;
  } else {
    videoTime = (video.currentTime / video.duration) * 100;
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

back10Seconds.addEventListener('mousedown', () => {
  if (video.paused) {
    return
  } else {
    isBackwardClicked = true;
  }
});

forward25Seconds.addEventListener('mousedown', () => {
  if (video.paused) {
    return;
  } else {
    isForwardClicked = true;
  }
});