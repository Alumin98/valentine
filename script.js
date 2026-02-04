// Initialize configuration
const config = window.VALENTINE_CONFIG;

// Validate configuration
function validateConfig() {
  const warnings = [];

  if (!config.valentineName) {
    warnings.push("Valentine's name is not set! Using default.");
    config.valentineName = "My Love";
  }

  const isValidHex = (hex) => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  Object.entries(config.colors).forEach(([key, value]) => {
    if (!isValidHex(value)) {
      warnings.push(`Invalid color for ${key}! Using default.`);
      config.colors[key] = getDefaultColor(key);
    }
  });

  if (parseFloat(config.animations.floatDuration) < 5) {
    warnings.push("Float duration too short! Setting to 5s minimum.");
    config.animations.floatDuration = "5s";
  }

  if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
    warnings.push("Heart explosion size should be between 1 and 3! Using default.");
    config.animations.heartExplosionSize = 1.5;
  }

  if (warnings.length > 0) {
    console.warn("⚠️ Configuration Warnings:");
    warnings.forEach((warning) => console.warn(`- ${warning}`));
  }
}

// Default color values
function getDefaultColor(key) {
  const defaults = {
    backgroundStart: "#ffafbd",
    backgroundEnd: "#ffc3a0",
    buttonBackground: "#ff6b6b",
    buttonHover: "#ff8787",
    textColor: "#ff4757"
  };
  return defaults[key];
}

document.title = config.pageTitle;

// Initialize the page content when DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  validateConfig();

  document.getElementById("valentineTitle").textContent = `${config.valentineName}, baby...`;

  document.getElementById("question1Text").textContent = config.questions.first.text;
  document.getElementById("yesBtn1").textContent = config.questions.first.yesBtn;
  document.getElementById("noBtn1").textContent = config.questions.first.noBtn;
  document.getElementById("secretAnswerBtn").textContent = config.questions.first.secretAnswer;

  document.getElementById("question2Text").textContent = config.questions.second.text;
  document.getElementById("startText").textContent = config.questions.second.startText;
  document.getElementById("nextBtn").textContent = config.questions.second.nextBtn;

  document.getElementById("question3Text").textContent = config.questions.third.text;
  document.getElementById("yesBtn3").textContent = config.questions.third.yesBtn;
  document.getElementById("noBtn3").textContent = config.questions.third.noBtn;

  setupButtonSound();
  createFloatingElements();
});

// Create floating hearts and bears
function createFloatingElements() {
  const container = document.querySelector(".floating-elements");

  config.floatingEmojis.hearts.forEach((heart) => {
    const div = document.createElement("div");
    div.className = "heart";
    div.innerHTML = heart;
    setRandomPosition(div);
    container.appendChild(div);
  });

  config.floatingEmojis.bears.forEach((bear) => {
    const div = document.createElement("div");
    div.className = "bear";
    div.innerHTML = bear;
    setRandomPosition(div);
    container.appendChild(div);
  });
}

// Set random position for floating elements
function setRandomPosition(element) {
  element.style.left = `${Math.random() * 100}vw`;
  element.style.animationDelay = `${Math.random() * 5}s`;
  element.style.animationDuration = `${10 + Math.random() * 20}s`;
}

const buttonSound = document.getElementById("buttonSound");
const yesBtn1 = document.getElementById("yesBtn1");
const noBtn1 = document.getElementById("noBtn1");
let audioContext;

function setupButtonSound() {
  if (!buttonSound) {
    return;
  }

  if (config.buttonSound?.url) {
    buttonSound.src = config.buttonSound.url;
  }

  buttonSound.volume = config.buttonSound?.volume ?? 0.8;

  [yesBtn1, noBtn1].forEach((button) => {
    if (!button) {
      return;
    }
    button.addEventListener("click", playButtonSound);
  });
}

function playButtonSound() {
  if (buttonSound && buttonSound.src) {
    buttonSound.currentTime = 0;
    buttonSound.play().catch(() => {
      playFallbackBoom();
    });
    return;
  }

  playFallbackBoom();
}

function playFallbackBoom() {
  if (!window.AudioContext && !window.webkitAudioContext) {
    return;
  }

  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(120, audioContext.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(40, audioContext.currentTime + 0.4);
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.45);
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
}

// Function to show next question
function showNextQuestion(questionNumber) {
  document.querySelectorAll(".question-section").forEach((q) => q.classList.add("hidden"));
  document.getElementById(`question${questionNumber}`).classList.remove("hidden");
}

// Function to move the "No" button when clicked
function moveButton(button) {
  const x = Math.random() * (window.innerWidth - button.offsetWidth);
  const y = Math.random() * (window.innerHeight - button.offsetHeight);
  button.style.position = "fixed";
  button.style.left = `${x}px`;
  button.style.top = `${y}px`;
}

// Love meter functionality
const loveMeter = document.getElementById("loveMeter");
const loveValue = document.getElementById("loveValue");
const extraLove = document.getElementById("extraLove");

function setInitialPosition() {
  loveMeter.value = 100;
  loveValue.textContent = 100;
  loveMeter.style.width = "100%";
}

loveMeter.addEventListener("input", () => {
  const value = parseInt(loveMeter.value, 10);
  loveValue.textContent = value;

  if (value > 100) {
    extraLove.classList.remove("hidden");
    const overflowPercentage = (value - 100) / 9900;
    const extraWidth = overflowPercentage * window.innerWidth * 0.8;
    loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
    loveMeter.style.transition = "width 0.3s";

    if (value >= 5000) {
      extraLove.classList.add("super-love");
      extraLove.textContent = config.loveMessages.extreme;
    } else if (value > 1000) {
      extraLove.classList.remove("super-love");
      extraLove.textContent = config.loveMessages.high;
    } else {
      extraLove.classList.remove("super-love");
      extraLove.textContent = config.loveMessages.normal;
    }
  } else {
    extraLove.classList.add("hidden");
    extraLove.classList.remove("super-love");
    loveMeter.style.width = "100%";
  }
});

// Initialize love meter
window.addEventListener("DOMContentLoaded", setInitialPosition);
window.addEventListener("load", setInitialPosition);

// Celebration function
function celebrate() {
  document.querySelectorAll(".question-section").forEach((q) => q.classList.add("hidden"));
  const celebration = document.getElementById("celebration");
  celebration.classList.remove("hidden");

  document.getElementById("celebrationTitle").textContent = config.celebration.title;
  document.getElementById("celebrationMessage").textContent = config.celebration.message;
  document.getElementById("celebrationEmojis").textContent = config.celebration.emojis;

  createHeartExplosion();
}

// Create heart explosion animation
function createHeartExplosion() {
  for (let i = 0; i < 50; i += 1) {
    const heart = document.createElement("div");
    const randomHeart =
      config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
    heart.innerHTML = randomHeart;
    heart.className = "heart";
    document.querySelector(".floating-elements").appendChild(heart);
    setRandomPosition(heart);
  }
}
