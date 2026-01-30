// MelodyWave Music Player
// Human-coded implementation

// DOM Elements
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const progressBar = document.getElementById('progressBar');
const progressContainer = document.getElementById('progressContainer');
const currentTimeEl = document.getElementById('currentTime');
const songDurationEl = document.getElementById('songDuration');
const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');
const currentSongTitle = document.getElementById('currentSongTitle');
const currentSongArtist = document.getElementById('currentSongArtist');
const songsList = document.querySelector('.songs-list');
const shuffleAllBtn = document.querySelector('.shuffle-btn');

// Music Library Data
const musicLibrary = [
    {
        id: 1,
        title: "Midnight City",
        artist: "M83",
        album: "Hurry Up, We're Dreaming",
        year: 2011,
        duration: "4:04",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        genre: "Electronic"
    },
    {
        id: 2,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        year: 2020,
        duration: "3:22",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        genre: "Pop"
    },
    {
        id: 3,
        title: "All I Want For Christmas",
        artist: "Mariah Carey",
        album: "Merry Christmas",
        year: 1994,
        duration: "4:01",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        genre: "Holiday"
    },
    {
        id: 4,
        title: "All pending I love you by name",
        artist: "Cute Voice Effects",
        album: "Voice Collection",
        year: 2023,
        duration: "0:32",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        genre: "Voice Effects"
    },
    {
        id: 5,
        title: "Ap Mujhpey Shak Kary Ho ?",
        artist: "Female Voice Effect",
        album: "Voice Messages",
        year: 2023,
        duration: "0:04",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        genre: "Voice Effects"
    },
    {
        id: 6,
        title: "AUD-20251013-WA0000",
        artist: "Unknown Artist",
        album: "WhatsApp Audio",
        year: 2023,
        duration: "1:29",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        genre: "Recording"
    },
    {
        id: 7,
        title: "AUD-20251013-WA0001",
        artist: "Unknown Artist",
        album: "WhatsApp Audio",
        year: 2023,
        duration: "0:09",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        genre: "Recording"
    },
    {
        id: 8,
        title: "Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        year: 1975,
        duration: "5:55",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
        genre: "Rock"
    },
    {
        id: 9,
        title: "Take On Me",
        artist: "a-ha",
        album: "Hunting High and Low",
        year: 1985,
        duration: "3:47",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
        genre: "Pop"
    },
    {
        id: 10,
        title: "Billie Jean",
        artist: "Michael Jackson",
        album: "Thriller",
        year: 1982,
        duration: "4:54",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
        genre: "Pop"
    },
    {
        id: 11,
        title: "Smells Like Teen Spirit",
        artist: "Nirvana",
        album: "Nevermind",
        year: 1991,
        duration: "5:01",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
        genre: "Rock"
    },
    {
        id: 12,
        title: "Hotel California",
        artist: "Eagles",
        album: "Hotel California",
        year: 1977,
        duration: "6:30",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
        genre: "Rock"
    },
    {
        id: 13,
        title: "Apko Help Nehi Karni",
        artist: "Cute Voice Effects",
        album: "Voice Collection",
        year: 2023,
        duration: "0:16",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3",
        genre: "Voice Effects"
    },
    {
        id: 14,
        title: "Shape of You",
        artist: "Ed Sheeran",
        album: "÷ (Divide)",
        year: 2017,
        duration: "3:54",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3",
        genre: "Pop"
    },
    {
        id: 15,
        title: "20251017_211211",
        artist: "Unknown Artist",
        album: "Recordings",
        year: 2023,
        duration: "0:06",
        file: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3",
        genre: "Recording"
    }
];

// Player state
let currentSongIndex = 0;
let isPlaying = false;
let isShuffled = false;
let isRepeating = false;
let currentPlaylist = [...musicLibrary];

// Initialize the player
function initPlayer() {
    console.log("Initializing MelodyWave Music Player...");
    
    // Render songs list
    renderSongsList();
    
    // Load first song
    loadSong(currentSongIndex);
    
    // Setup event listeners
    setupEventListeners();
    
    // Update UI
    updatePlayButton();
    
    console.log("Player initialized successfully!");
}

// Render songs list
function renderSongsList() {
    songsList.innerHTML = '';
    
    currentPlaylist.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.className = `song-item ${index === currentSongIndex ? 'active' : ''}`;
        songItem.dataset.index = index;
        
        songItem.innerHTML = `
            <div class="song-number">${index + 1}</div>
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist} • ${song.album}</div>
            </div>
            <div class="song-duration">${song.duration}</div>
            <div class="song-actions">
                <button class="btn-like" title="Add to favorites">
                    <i class="far fa-heart"></i>
                </button>
                <button class="btn-more" title="More options">
                    <i class="fas fa-ellipsis-h"></i>
                </button>
            </div>
        `;
        
        songItem.addEventListener('click', (e) => {
            if (!e.target.closest('.song-actions')) {
                loadSong(index);
                if (!isPlaying) {
                    togglePlayPause();
                }
            }
        });
        
        songsList.appendChild(songItem);
    });
}

// Load a song
function loadSong(index) {
    if (index < 0 || index >= currentPlaylist.length) return;
    
    currentSongIndex = index;
    const song = currentPlaylist[index];
    
    // Update audio source
    audioPlayer.src = song.file;
    
    // Update UI
    currentSongTitle.textContent = song.title;
    currentSongArtist.textContent = `${song.artist} • ${song.album}`;
    songDurationEl.textContent = song.duration;
    
    // Update active song in list
    updateActiveSong();
    
    // Reset progress
    progressBar.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    
    // Auto-play if player was playing
    if (isPlaying) {
        setTimeout(() => {
            audioPlayer.play().catch(e => console.log("Auto-play prevented:", e));
        }, 100);
    }
}

// Update active song in list
function updateActiveSong() {
    const songItems = document.querySelectorAll('.song-item');
    songItems.forEach((item, index) => {
        if (index === currentSongIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Format time (seconds to MM:SS)
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Update progress bar
function updateProgress() {
    const { currentTime, duration } = audioPlayer;
    
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        
        currentTimeEl.textContent = formatTime(currentTime);
        songDurationEl.textContent = formatTime(duration);
    }
}

// Seek in song
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    
    if (duration) {
        audioPlayer.currentTime = (clickX / width) * duration;
    }
}

// Play/Pause toggle
function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play().catch(e => console.log("Play error:", e));
    }
    
    isPlaying = !isPlaying;
    updatePlayButton();
}

// Update play button icon
function updatePlayButton() {
    if (isPlaying) {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        playPauseBtn.title = "Pause";
    } else {
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        playPauseBtn.title = "Play";
    }
}

// Play next song
function playNextSong() {
    let nextIndex;
    
    if (isShuffled) {
        do {
            nextIndex = Math.floor(Math.random() * currentPlaylist.length);
        } while (nextIndex === currentSongIndex && currentPlaylist.length > 1);
    } else {
        nextIndex = currentSongIndex + 1;
        
        if (nextIndex >= currentPlaylist.length) {
            if (isRepeating) {
                nextIndex = 0;
            } else {
                nextIndex = currentSongIndex;
                isPlaying = false;
                updatePlayButton();
                return;
            }
        }
    }
    
    loadSong(nextIndex);
    
    if (isPlaying) {
        audioPlayer.play();
    }
}

// Play previous song
function playPrevSong() {
    let prevIndex;
    
    if (isShuffled) {
        do {
            prevIndex = Math.floor(Math.random() * currentPlaylist.length);
        } while (prevIndex === currentSongIndex && currentPlaylist.length > 1);
    } else {
        prevIndex = currentSongIndex - 1;
        
        if (prevIndex < 0) {
            if (isRepeating) {
                prevIndex = currentPlaylist.length - 1;
            } else {
                prevIndex = 0;
            }
        }
    }
    
    loadSong(prevIndex);
    
    if (isPlaying) {
        audioPlayer.play();
    }
}

// Toggle shuffle
function toggleShuffle() {
    isShuffled = !isShuffled;
    
    if (isShuffled) {
        shuffleBtn.style.color = '#6c63ff';
        shuffleBtn.title = "Shuffle On";
        
        // Shuffle playlist but keep current song first
        const shuffled = [currentPlaylist[currentSongIndex]];
        const remaining = currentPlaylist.filter((_, index) => index !== currentSongIndex);
        
        for (let i = remaining.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
        }
        
        currentPlaylist = [...shuffled, ...remaining];
        currentSongIndex = 0;
    } else {
        shuffleBtn.style.color = '#b0b0d0';
        shuffleBtn.title = "Shuffle Off";
        
        // Restore original order
        currentPlaylist = [...musicLibrary];
        const currentSong = currentPlaylist.find(song => song.id === musicLibrary[currentSongIndex].id);
        currentSongIndex = currentPlaylist.indexOf(currentSong);
    }
    
    renderSongsList();
    updateActiveSong();
}

// Toggle repeat
function toggleRepeat() {
    isRepeating = !isRepeating;
    
    if (isRepeating) {
        repeatBtn.style.color = '#6c63ff';
        repeatBtn.title = "Repeat On";
    } else {
        repeatBtn.style.color = '#b0b0d0';
        repeatBtn.title = "Repeat Off";
    }
}

// Change volume
function changeVolume() {
    const volume = volumeSlider.value / 100;
    audioPlayer.volume = volume;
    
    // Update volume icon
    if (volume === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}

// Shuffle all songs
function shuffleAllSongs() {
    // Reset shuffle state
    isShuffled = true;
    shuffleBtn.style.color = '#6c63ff';
    shuffleBtn.title = "Shuffle On";
    
    // Create shuffled playlist
    const shuffled = [...musicLibrary];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    currentPlaylist = shuffled;
    currentSongIndex = 0;
    
    // Render and play
    renderSongsList();
    loadSong(0);
    
    if (!isPlaying) {
        togglePlayPause();
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Play/Pause button
    playPauseBtn.addEventListener('click', togglePlayPause);
    
    // Navigation buttons
    nextBtn.addEventListener('click', playNextSong);
    prevBtn.addEventListener('click', playPrevSong);
    
    // Progress bar
    progressContainer.addEventListener('click', setProgress);
    
    // Volume control
    volumeSlider.addEventListener('input', changeVolume);
    
    // Player controls
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', toggleRepeat);
    
    // Shuffle all button
    shuffleAllBtn.addEventListener('click', shuffleAllSongs);
    
    // Audio events
    audioPlayer.addEventListener('timeupdate', updateProgress);
    audioPlayer.addEventListener('ended', () => {
        if (isRepeating) {
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        } else {
            playNextSong();
        }
    });
    
    audioPlayer.addEventListener('loadedmetadata', () => {
        if (audioPlayer.duration) {
            songDurationEl.textContent = formatTime(audioPlayer.duration);
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                togglePlayPause();
                break;
            case 'ArrowRight':
                if (e.ctrlKey) playNextSong();
                else audioPlayer.currentTime += 10;
                break;
            case 'ArrowLeft':
                if (e.ctrlKey) playPrevSong();
                else audioPlayer.currentTime -= 10;
                break;
            case 'ArrowUp':
                volumeSlider.value = Math.min(100, parseInt(volumeSlider.value) + 10);
                changeVolume();
                break;
            case 'ArrowDown':
                volumeSlider.value = Math.max(0, parseInt(volumeSlider.value) - 10);
                changeVolume();
                break;
        }
    });
    
    // Sidebar navigation
    const navItems = document.querySelectorAll('.main-nav li');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// Initialize player when page loads
document.addEventListener('DOMContentLoaded', initPlayer);