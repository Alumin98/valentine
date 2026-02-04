const CONFIG = {
  valentineName: "Fatemeh Shokri",
  pageTitle: "Will You Be My Valentine? 💝",
  floatingEmojis: {
    hearts: ["❤️", "💖", "💝", "💗", "💓"],
    bears: ["🧸", "🐻"]
  },
  questions: {
    first: {
      text: "Do you like being bothered all the time?",
      yesBtn: "Not Really",
      noBtn: "NO",
      secretAnswer: "yes"
    },
    second: {
      text: "How much do you love me?",
      startText: "This much!",
      nextBtn: "Next ❤️"
    },
    third: {
      text: "Will you be my Valentine on February 14th, 2025? 🌹",
      yesBtn: "Yes!",
      noBtn: "No"
    }
  },
  loveMessages: {
    extreme: "WOOOOW You love me that much?? 🥰🚀💝",
    high: "To infinity and beyond! 🚀💝",
    normal: "And beyond! 🥰"
  },
  celebration: {
    title: "Yay! I'm the luckiest person in the world! 🎉💝💖💝💓",
    message: "Now come get your gift, a big warm hug and a huge kiss!",
    emojis: "🎁💖🤗💝💋❤️💕"
  },
  colors: {
    backgroundStart: "#ffafbd",
    backgroundEnd: "#ffc3a0",
    buttonBackground: "#ff6b6b",
    buttonHover: "#ff8787",
    textColor: "#ff4757"
  },
  animations: {
    floatDuration: "15s",
    floatDistance: "50px",
    bounceSpeed: "0.5s",
    heartExplosionSize: 1.5
  },
  buttonSound: {
    url: "",
    volume: 0.8
  }
};

window.VALENTINE_CONFIG = CONFIG;
