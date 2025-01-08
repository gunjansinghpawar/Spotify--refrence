console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Aakhir_Tumhein_Aana_Hai", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Aankhon_Mein_Teri_Ajab_Si", filePath: "songs/2.mp3", coverPath: "covers/1.jpg" },
    { songName: "Bulleya", filePath: "songs/3.mp3", coverPath: "covers/1.jpg" },
    { songName: "Born_To_Shine", filePath: "songs/4.mp3", coverPath: "covers/1.jpg" },
    { songName: "EK_MULAQAT", filePath: "songs/5.mp3", coverPath: "covers/1.jpg" },
    { songName: "Angaaron", filePath: "songs/6.mp3", coverPath: "covers/1.jpg" },
    { songName: "Ek_Haseena_Thi", filePath: "songs/7.mp3", coverPath: "covers/1.jpg" },
    { songName: "Haye_Mera_DIL", filePath: "songs/8.mp3", coverPath: "covers/1.jpg" },
    { songName: "Mere_Sapno_Ki_Rani_Kab_Aayegi_Tu", filePath: "songs/9.mp3", coverPath: "covers/1.jpg" },
    { songName: "Pyaar_Tune_Kya_Kiya", filePath: "songs/10.mp3", coverPath: "covers/1.jpg" },
    { songName: "Zara sa dil me de jagah tu", filePath: "songs/11.mp3", coverPath: "covers/1.jpg" },
]
const songContainer = document.querySelector('.songItemContainer');
songContainer.innerHTML = songs.map((song, index) => `
    <div class="songItem">
        <img src="${song.coverPath}" alt="${index + 1}">
        <span class="songName">${song.songName}</span>
        <span class="songlistplay">
            <span class="timestamp">05:34 
                <i id="${index}" class="fa-solid fa-circle-play songListPlay"></i>
            </span>
        </span>
    </div>
`).join('');
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songListPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})