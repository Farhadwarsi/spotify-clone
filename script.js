console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Nee Singam Dhan", filePath: "1.mp3", coverPath: "p1.jpg"},
    {songName: "Shayad - love aaj kal", filePath: "2.mp3", coverPath: "p2.jpg"},
    {songName: "Zaroor x Tera bina", filePath: "3.mp3", coverPath: "p3.jpg"},
    {songName: "Kalank Title Track", filePath: "4.mp3", coverPath: "p4.jpg"},
    {songName: "Ranjheya Ve - Zain Zohaib", filePath: "5.mp3", coverPath: "p5.jpg"},
    {songName: "Tere Hawaale- Arijit Singh", filePath: "6.mp3", coverPath: "p6.jpg"},
    {songName: "Pal Pal Dil Ke Pass", filePath: "7.mp3", coverPath: "p7.jpg"},
    {songName: "O Meri Laila", filePath: "8.mp3", coverPath: "p8.jpg"},
    {songName: "Subhanallah - YJHD", filePath: "9.mp3", coverPath: "p9.jpg"},
    {songName: "Hawayein - JHMS", filePath: "10.mp3", coverPath: "p10.jpg"},
];

songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
    updateControls();
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Seek feature
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.replace('fa-pause-circle', 'fa-play-circle');
    });
};

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        if (songIndex === i && !audioElement.paused) {
            audioElement.pause();
        } else {
            makeAllPlays();
            songIndex = i;
            audioElement.src = songs[songIndex].filePath;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
        }
        updateControls();
    });
});

// Next button
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateControls();
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    updateControls();
});

const updateControls = () => {
    if (audioElement.paused) {
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
        gif.style.opacity = 0;
        makeAllPlays();
    } else {
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
        gif.style.opacity = 1;
        document.getElementsByClassName('songItemPlay')[songIndex].classList.replace('fa-play-circle', 'fa-pause-circle');
    }
};
