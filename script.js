const state = {
  loveMeterValue: 0,
  loveMeterTimer: null
};

const sections = {
  question1: document.getElementById("question-1"),
  loveMeter: document.getElementById("love-meter"),
  question3: document.getElementById("question-3"),
  celebration: document.getElementById("celebration")
};

const q1Text = document.getElementById("q1-text");
const q1Yes = document.getElementById("q1-yes");
const q1No = document.getElementById("q1-no");
const q1Secret = document.getElementById("q1-secret");

const q2Text = document.getElementById("q2-text");
const loveMeterStart = document.getElementById("love-meter-start");
const loveMeterNext = document.getElementById("love-meter-next");
const loveMeterFill = document.getElementById("love-meter-fill");
const loveMeterValue = document.getElementById("love-meter-value");
const loveMeterMessage = document.getElementById("love-meter-message");

const q3Text = document.getElementById("q3-text");
const q3Yes = document.getElementById("q3-yes");
const q3No = document.getElementById("q3-no");

const celebrationTitle = document.getElementById("celebration-title");
const celebrationMessage = document.getElementById("celebration-message");
const celebrationEmojis = document.getElementById("celebration-emojis");

const dancingCatContainer = document.getElementById("dancing-cat-container");
const dancingCat = document.getElementById("dancing-cat");
const happyMusic = document.getElementById("happy-music");
const happyMusicPlayBtn = document.getElementById("happy-music-play-btn");

const floatingEmojisContainer = document.getElementById("floating-emojis");

const showSection = (sectionToShow) => {
  Object.values(sections).forEach((section) => {
    section.classList.remove("active");
  });
  sectionToShow.classList.add("active");
};

const setShake = (element) => {
  element.classList.remove("shake");
  void element.offsetWidth;
  element.classList.add("shake");
};

const moveButtonRandomly = (button) => {
  const offsetX = Math.random() * 120 - 60;
  const offsetY = Math.random() * 60 - 30;
  button.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
};

const setupFloatingEmojis = () => {
  floatingEmojisContainer.innerHTML = "";
  const emojiList = config.floatingEmojis || [];
  emojiList.forEach((emoji, index) => {
    const span = document.createElement("span");
    span.textContent = emoji;
    span.style.left = `${(index * 37) % 100}%`;
    span.style.animationDelay = `${index * 0.8}s`;
    span.style.animationDuration = `${10 + (index % 5)}s`;
    floatingEmojisContainer.appendChild(span);
  });
};

const setupQuestion1 = () => {
  q1Text.textContent = config.questions.first.text;
  q1Yes.textContent = config.questions.first.yesBtn;
  q1No.textContent = config.questions.first.noBtn;
  q1Secret.textContent = config.questions.first.secretAnswer;

  q1Yes.addEventListener("click", () => {
    setShake(sections.question1);
  });

  q1No.addEventListener("mouseenter", () => {
    moveButtonRandomly(q1No);
  });

  q1No.addEventListener("click", () => {
    setShake(sections.question1);
    moveButtonRandomly(q1No);
  });

  q1Secret.addEventListener("click", () => {
    showSection(sections.loveMeter);
  });
};

const updateLoveMeter = () => {
  loveMeterFill.style.width = `${Math.min(state.loveMeterValue, 160)}%`;
  loveMeterValue.textContent = `${state.loveMeterValue}%`;

  if (state.loveMeterValue >= 150) {
    loveMeterMessage.textContent = config.loveMessages.extreme;
  } else if (state.loveMeterValue >= 130) {
    loveMeterMessage.textContent = config.loveMessages.high;
  } else if (state.loveMeterValue > 100) {
    loveMeterMessage.textContent = config.loveMessages.normal;
  } else {
    loveMeterMessage.textContent = "";
  }
};

const startLoveMeter = () => {
  if (state.loveMeterTimer) {
    return;
  }

  state.loveMeterTimer = window.setInterval(() => {
    state.loveMeterValue += 5;
    if (state.loveMeterValue > 160) {
      clearInterval(state.loveMeterTimer);
      state.loveMeterTimer = null;
    }
    updateLoveMeter();
  }, 200);
};

const setupQuestion2 = () => {
  q2Text.textContent = config.questions.second.text;
  loveMeterStart.textContent = config.questions.second.startText;
  loveMeterNext.textContent = config.questions.second.nextBtn;

  loveMeterStart.addEventListener("click", startLoveMeter);
  loveMeterNext.addEventListener("click", () => {
    showSection(sections.question3);
  });
};

const setupQuestion3 = () => {
  q3Text.textContent = config.questions.third.text;
  q3Yes.textContent = config.questions.third.yesBtn;
  q3No.textContent = config.questions.third.noBtn;

  q3No.addEventListener("mouseenter", () => {
    moveButtonRandomly(q3No);
  });

  q3Yes.addEventListener("click", () => {
    showCelebration();
  });
};

const showCelebration = () => {
  celebrationTitle.textContent = config.celebration.title;
  celebrationMessage.textContent = config.celebration.message;
  celebrationEmojis.textContent = config.celebration.emojis;

  showSection(sections.celebration);

  if (dancingCat && dancingCatContainer) {
    dancingCat.src = config.celebrationExtras.catGifUrl;
    dancingCatContainer.style.display = "flex";
  }

  if (happyMusic) {
    happyMusic.src = config.celebrationExtras.happyMusicUrl;
    happyMusic.volume = config.celebrationExtras.musicVolume;
    happyMusic
      .play()
      .then(() => {
        if (happyMusicPlayBtn) {
          happyMusicPlayBtn.style.display = "none";
        }
      })
      .catch(() => {
        if (happyMusicPlayBtn) {
          happyMusicPlayBtn.style.display = "inline-block";
          happyMusicPlayBtn.onclick = () => {
            happyMusic.play();
          };
        }
      });
  }
};

const setupCelebration = () => {
  celebrationTitle.textContent = config.celebration.title;
  celebrationMessage.textContent = config.celebration.message;
  celebrationEmojis.textContent = config.celebration.emojis;
};

const setupGlobalMusic = () => {
  if (!config.music.enabled) {
    return;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.title = config.pageTitle;
  setupFloatingEmojis();
  setupQuestion1();
  setupQuestion2();
  setupQuestion3();
  setupCelebration();
  setupGlobalMusic();
});
