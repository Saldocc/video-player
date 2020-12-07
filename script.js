const player = document.querySelector(".player")
const video = document.querySelector("video");
const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const playBtn = document.querySelector("#play-btn");
const volumeIcon = document.querySelector("#volume-icon");
const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const currentTime = document.querySelector(".time-elapsed");
const duration = document.querySelector(".time-duration");
const fullscreenBtn = document.querySelector(".fullscreen");
const speed = document.querySelector(".player-speed")

// Play & Pause ----------------------------------- //
function showReplayIcon() {
  playBtn.className = "";
  playBtn.classList.add("fas", "fa-redo");
  playBtn.setAttribute("title", "Replay");
}

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.className = "";
    playBtn.classList.add("fas", "fa-pause");
    playBtn.setAttribute("title", "Pause");
  } else {
    video.pause();
    playBtn.className = "";
    playBtn.classList.add("fas", "fa-play");
    playBtn.setAttribute("title", "Play");
  }
}

//when video ended
video.addEventListener("ended", showReplayIcon);

// Progress Bar ---------------------------------- //

function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  if (seconds) {
    return `${minutes}:${seconds}`;
  }
}

function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  currentTime.textContent = `${displayTime(video.currentTime)} /`;
  duration.textContent = `${displayTime(video.duration)}`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = video;
  video.currentTime = (clickX / width) * duration;
}

// Volume Controls --------------------------- //

let lastVolume = 1;

function changeVolume(e) {
  let volume = e.offsetX / volumeRange.offsetWidth;

  if (volume < 0.1) {
    volume = 0;
  }
  if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;

  // change volume icon
  volumeIcon.className = "";
  if (volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }

  lastVolume = volume;
}

// mute/unmute funtion
function toggleMute() {
  volumeIcon.className = "";
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = `0%`;
    volumeIcon.setAttribute("title", "Unmute");
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.setAttribute("title", "Mute");
  }
  if (video.volume > 0.7) {
    volumeIcon.classList.add("fas", "fa-volume-up");
  } else if (video.volume < 0.7 && video.volume > 0) {
    volumeIcon.classList.add("fas", "fa-volume-down");
  } else if (video.volume === 0) {
    volumeIcon.classList.add("fas", "fa-volume-off");
  }
}

// Change Playback Speed -------------------- //

function changeSpeed(){
  video.playbackRate = speed.value
}

// Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add("video-fullscreen")
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove("video-fullscreen")
}

let fullscreen = false

function toggleFullscreen(){
  !fullscreen ?  openFullscreen(player) : closeFullscreen()
  fullscreen = !fullscreen
}

//event listeners
playBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("canplay", updateProgress);
progressRange.addEventListener("click", setProgress);
volumeRange.addEventListener("click", changeVolume);
volumeIcon.addEventListener("click", toggleMute);
speed.addEventListener("change", changeSpeed)
fullscreenBtn.addEventListener("click", toggleFullscreen)
