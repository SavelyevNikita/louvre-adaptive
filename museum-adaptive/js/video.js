const playBtn = document.querySelector('#play_pause');
const progress = document.querySelector('#progress');
const muteBtn = document.querySelector('#sound_mute');
const soundLevel = document.querySelector('#sound_level');
const screenBtn = document.querySelector('#screen');
const player = document.querySelector('#player');
// console.log(playBtn);
// console.log(progress);
// console.log(muteBtn);
// console.log(soundLevel);
// console.log(screenBtn);
let playTogglet = false;
let muteTogglet = false;

playBtn.addEventListener('click', (e) => {
    if (!playTogglet) {
        player.play();
        playTogglet = true;
    } else {
        player.pause();
        playTogglet = false;
    }
});

muteBtn.addEventListener('click', (e) => {
    player.volume = 0;
});

screenBtn.addEventListener('click', (e) => {
    console.log(e);
    console.log(screenBtn);
    console.log(player);
    player.requestFullScreen();
    // requestFullscreen()

});
player.ontimeupdate = playerMove;

function playerMove() {
    progress.value = (player.currentTime / player.duration) * 100;
}

soundLevel.addEventListener('input', (e) => {
    player.volume = soundLevel.value / 100;
});
progress.addEventListener('input', (e) => {
    console.log(progress.value);
})
progress.addEventListener('click', (e) => {
    player.pause();
    player.currentTime = (progress.value / 100) * player.duration;
});