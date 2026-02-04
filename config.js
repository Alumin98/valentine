const config = {
  valentineName: "baby",
  pageTitle: "Baby, will you be my Valentine? 💘",
  floatingEmojis: ["💖", "💘", "💗", "💞", "🐻", "💓"],
  questions: {
    first: {
      text: "Do you like being bothered all the time?",
      yesBtn: "Not Really",
      noBtn: "NO",
      secretAnswer: "yes"
    },
    second: {
      text: "How much do you love me, baby?",
      startText: "This much!",
      nextBtn: "Next ❤️"
    },
    third: {
      text: "Baby, will you be my Valentine this year? 💘",
      yesBtn: "Yes, of course!",
      noBtn: "No"
    }
  },
  loveMessages: {
    extreme: "Ohhhhhhh NOH",
    high: "Ohhhh",
    normal: "hmmm"
  },
  celebration: {
    title: "Baby, Fatemeh Shokri said YES! 💕",
    message: "You’re stuck with me now, baby. Get ready to be bothered forever. 😈",
    emojis: "❤️"
  },
  celebrationExtras: {
    catGifUrl: "CAT_GIF_URL_HERE",
    happyMusicUrl: "HAPPY_MUSIC_URL_HERE",
    musicVolume: 0.6
  },
  colors: {
    backgroundStart: "#ff9a9e",
    backgroundEnd: "#fad0c4",
    primary: "#ff4d6d",
    secondary: "#fff0f6",
    text: "#4a2c2a"
  },
  animations: {
    floatingSpeed: 12
  },
  music: {
    enabled: false,
    autoplay: false,
    musicUrl: "",
    startText: "",
    stopText: "",
    volume: 0.5
  }
};
window.config = config;
