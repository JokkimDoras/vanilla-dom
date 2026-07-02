const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const screen = document.querySelector('.screen');

function togglePlay() {
    const method = video.paused ? 'play' : 'pause'
    video[method]();
}
function skip(){
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate () {
    video[this.name] = this.value;

}

function handleProgress() {
    const percent = (video.currentTime/video.duration) * 100;
    progressBar.style.flexBasis =`${percent}%`
}

function updateButton (e) {
    const icons = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icons
    console.log('update the button')

}
function scrub(e){
    const scrub = (e.offsetX/progress.offsetWidth) * video.duration;
    video.currentTime = scrub
}

function handleScreen() {
    if (video.classList.contains('fullscreen')) {
        video.classList.remove('fullscreen');
    } else {
        video.classList.add('fullscreen');
    }
}

video.addEventListener('click',togglePlay)
video.addEventListener('play',updateButton)
video.addEventListener('pause',updateButton)
video.addEventListener('timeupdate',handleProgress)
screen.addEventListener('click',handleScreen)

toggle.addEventListener('click',togglePlay)
skipButtons.forEach((button) => button.addEventListener('click',skip))
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate)) 
progressBar.addEventListener('click',scrub)