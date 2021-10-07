const playBtn = document.querySelector('#play_pause');
const progress = document.querySelector('#progress');
const muteBtn = document.querySelector('#sound_mute');
const buttonOnVideo = document.querySelector('.button-video');
const soundLevel = document.querySelector('#sound_level');
const screenBtn = document.querySelector('#screen');
const player = document.querySelector('#main_video');
// const fortestButton = document.querySelector('.fortest');
let playTogglet = false;
let muteTogglet = false;
let soundLevelSave = 0;


// ф-я запуск плеера
function launchedPlayVideo() {
    // if (!playTogglet) {
    playBtn.classList.add("play-pause-pressed");
    player.volume = soundLevel.value / 100;
    player.play();
    playTogglet = true;
    buttonOnVideo.style.display = 'none';
}
// ф-я останова плеера
function stoppedPlayVideo() {
    playBtn.classList.remove("play-pause-pressed");
    player.pause();
    playTogglet = false;
    buttonOnVideo.style.display = 'block';
}
// ф-я реверса плеера
function reversedVideo() {
    playBtn.classList.remove("play-pause-pressed");
    player.pause();
    playTogglet = false;
    buttonOnVideo.style.display = 'block';
    player.currentTime = 0
}
// ф-я отключения звука 
function mutedVideo() {
    soundLevelSave = player.volume;
    player.volume = 0;
    soundLevel.value = 0;
    muteTogglet = true;
    muteBtn.classList.add("sound-mute-pressed");
    // soundLevel.disabled = true;
}
// ф-я включения звука 
function unMuttedVideo() {
    soundLevel.value = soundLevelSave * 100;
    player.volume = soundLevelSave;
    muteTogglet = false;
    muteBtn.classList.remove("sound-mute-pressed");
    // soundLevel.disabled = false;
}

function playerMove() {
    progress.value = (player.currentTime / player.duration) * 100;
    if (progress.value >= 100) reversedVideo();
}

function speedUp() {
    player.play();
    player.playbackRate = 2;
}

function speedDown() {
    player.play();
    player.playbackRate = 0.5;
}
// fortestButton.addEventListener('click', reversedVideo);



playBtn.addEventListener('click', () => {
    if (!playTogglet) {
        launchedPlayVideo();
    } else {
        stoppedPlayVideo();
    }
});

buttonOnVideo.addEventListener('click', launchedPlayVideo);
player.addEventListener('click', stoppedPlayVideo);

document.onkeypress = (e) => {
    // console.log('onkeypress');
    console.log(e.code);
    if ((e.code).toLowerCase() === 'space') {
        if (!playTogglet) {
            launchedPlayVideo();
        } else {
            stoppedPlayVideo();
        }
    };
    if ((e.code).toLowerCase() === 'keym') {
        if (!muteTogglet) {
            mutedVideo();
        } else {
            unMuttedVideo();
        }
    };
    if ((e.code).toLowerCase() === 'keyf') {
        player.requestFullscreen();
    };
    if ((e.code).toLowerCase() === 'period') speedUp();
    if ((e.code).toLowerCase() === 'comma') speedDown();


}
muteBtn.addEventListener('click', () => {
    if (!muteTogglet) {
        mutedVideo();
    } else {
        unMuttedVideo();
    }
});

screenBtn.addEventListener('click', () => {
    player.requestFullscreen();
})

player.ontimeupdate = playerMove;

soundLevel.addEventListener('input', (e) => {
    player.volume = soundLevel.value / 100;
    if (player.volume <= 0) {
        mutedVideo();
        // } else {
        //     unMuttedVideo();
    }
});
progress.addEventListener('input', (e) => {
    console.log(progress.value);
})
progress.addEventListener('click', (e) => {
    // player.pause();
    player.currentTime = (progress.value / 100) * player.duration;
});