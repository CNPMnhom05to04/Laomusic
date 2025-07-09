class YoutubePlayer {
    constructor(containerSelector, youtubeData) {
        this.container = document.querySelector(containerSelector);
        this.youtubeData = youtubeData;
        this.init();
    }

    init() {
        this.renderMusicList();
        this.setupEventListeners();
    }

    renderMusicList() {
        this.container.innerHTML = this.youtubeData.map(song => `
      <div class="youtube-card" data-id="${song.id}">
        <img src="${song.cover}" class="youtube-cover" alt="${song.title}">
        <div class="youtube-info">
          <h3>${song.title}</h3>
          <p>${song.artist}</p>
          <button class="play-btn" data-id="${song.id}">
            <i class="fas fa-play"></i>
          </button>
        </div>
      </div>
    `).join('');
    }

    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            const playBtn = e.target.closest('.play-btn');
            if (playBtn) {
                this.playSong(playBtn.dataset.id);
            }
        });
    }

    playSong(songId) {
        const song = this.youtubeData.find(item => item.id == songId);
        console.log("Đang phát:", song.title);
    }

    updateyoutubeData(newData) {
        this.youtubeData = newData;
        this.renderMusicList();
    }
}

// Dữ liệu phải bao gồm `id`, `title` và `artist` (đồng nhất key)
const top2 = [
    {
        cover: "https://i.ytimg.com/vi/-GiQEctEv3c/hqdefault.jpg",
        title: "ສິມຈົ່ງຄືກັນນ້ອຍ",
        artist: "NGA SENGAMPHONE",

    },
    {
        cover: "https://i.ytimg.com/vi/1Q0aSDUCRQw/hqdefault.jpg",
        title: "คำถามที่อยากฟังคำตอบ",
        artist: "GRAMMY GOLD",

    },
    {

        cover: "https://i.ytimg.com/vi/FxFPSs71FSI/hqdefault.jpg",
        title: "จักรวาลไหน - Monica",
        artist: "19.Official",

    },
    {

        cover: "https://i.ytimg.com/vi/Ir_qJteOI3c/hqdefault.jpg",
        title: "โลกทั้งใบ - เล็ก รัชชานนท์",
        artist: "Genierock",

    },
    {

        cover: "https://i.ytimg.com/vi/kAYJ9I4nFBE/hqdefault.jpg",
        title: "ลำล่อง ลาวอีสาน",
        artist: "DOKJAN STUDIO",

    },
];

const top3 = [
    {

        artist: "Sơn Tùng M-TP",
        cover: "https://demo-sso-image.tinasoft.io/laonet/artist/IWZ97DB0_1742795934782.jpg",

    },
    {

        name: "Thùy Chi",
        cover: "https://demo-sso-image.tinasoft.io/laonet/avatar/1743150145275.jpg",

    },
    {

        name: "Hòa Minzy",
        cover: "https://demo-sso-image.tinasoft.io/laonet/genre/1742141874509.jpg",
    },
    {

        name: "Bùi Anh Tuấn",
        cover: "https://demo-sso-image.tinasoft.io/laonet/genre/1742141874509.jpg",

    },
    {

        name: "Bằng Kiều",
        cover: "https://demo-sso-image.tinasoft.io/laonet/genre/1742141874509.jpg",

    },
    {

        name: "Hà Anh Tuấn",
        cover: "https://demo-sso-image.tinasoft.io/laonet/genre/1742141874509.jpg",

    },
];


// Khởi tạo player
const player2 = new YoutubePlayer('#top2', top2);
const player3 = new YoutubePlayer('#top3', top3);
