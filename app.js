

class MusicPlayer {
    constructor(containerSelector, musicData) {
        this.container = document.querySelector(containerSelector);
        this.musicData = musicData;
        this.init();
    }

    init() {
        this.renderMusicList();
        this.setupEventListeners();
    }

    renderMusicList() {
        this.container.innerHTML = this.musicData.map(song => `
      <div class="music-card" data-id="${song.id}">
        <img src="${song.cover}" class="music-cover" alt="${song.title}">
        <div class="music-info">
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
        const song = this.musicData.find(item => item.id == songId);
        console.log("Đang phát:", song.title);
    }

    updateMusicData(newData) {
        this.musicData = newData;
        this.renderMusicList();
    }
}
const songs = [
    { cover: "./picture/SonTung.jpg", title: "Muộn Rồi Mà Sao Còn", artist: "Sơn Tùng M-TP" },
    { cover: "./picture/SonTung.jpg", title: "Chúng Ta Không Thuộc Về Nhau", artist: "Sơn Tùng M-TP" },
    { cover: "./picture/SonTung.jpg", title: "Nơi Này Có Anh", artist: "Sơn Tùng M-TP" },
    { cover: "./picture/SonTung.jpg", title: "Lạc Trôi", artist: "Sơn Tùng M-TP" },
    { cover: "./picture/SonTung.jpg", title: "Hãy Trao Cho Anh", artist: "Sơn Tùng M-TP" },
    { cover: "./picture/SonTung.jpg", title: "There's No One At All", artist: "Sơn Tùng M-TP" },
    { cover: "./picture/SonTung.jpg", title: "Chạy Ngay Đi", artist: "Sơn Tùng M-TP" },
];

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
const player = new MusicPlayer("#top1", songs);
const player2 = new MusicPlayer("#top2", top2);
const player3 = new MusicPlayer("#top3", top3);

