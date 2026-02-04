// SIMPLE FLOW:
// step-1 -> step-2 -> step-3 -> step-final

function showStep(id) {
  document.querySelectorAll(".step").forEach((s) => {
    s.classList.remove("active");
  });
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  // Start at step 1
  showStep("step-1");

  // STEP 1 BUTTONS
  const btnNotReally = document.getElementById("btn-not-really");
  const btnNo = document.getElementById("btn-no");
  const btnSecretYes = document.getElementById("btn-secret-yes");
  const step1Msg = document.getElementById("step-1-message");

  if (btnNotReally) {
    btnNotReally.addEventListener("click", () => {
      step1Msg.textContent = "That’s okay… I’ll still bother you anyway 😈";
    });
  }

  if (btnNo) {
    btnNo.addEventListener("click", () => {
      step1Msg.textContent =
        "Lies. Pure lies. Try looking a bit lower on the screen… 👇";
      jiggleButton(btnNo);
    });
  }

  if (btnSecretYes) {
    btnSecretYes.addEventListener("click", () => {
      showStep("step-2");
    });
  }

  // STEP 2 – LOVE METER
  const slider = document.getElementById("love-slider");
  const loveFill = document.getElementById("love-fill");
  const loveMsg = document.getElementById("love-message");
  const btnToStep3 = document.getElementById("btn-to-step-3");

  if (slider && loveFill) {
    slider.addEventListener("input", () => {
      const val = Number(slider.value);
      loveFill.style.width = val + "%";

      // Messages:
      // 0 = nothing
      // 1–40 = "hmmm"
      // 41–80 = "Ohhhh"
      // 81–100 = "Ohhhhhhh NOH"
      if (val === 0) {
        loveMsg.textContent = "";
      } else if (val <= 40) {
        loveMsg.textContent = "hmmm 🤨";
      } else if (val <= 80) {
        loveMsg.textContent = "Ohhhh 👀";
      } else {
        loveMsg.textContent = "Ohhhhhhh NOH 😂";
      }
    });
  }

  if (btnToStep3) {
    btnToStep3.addEventListener("click", () => {
      showStep("step-3");
    });
  }

  // STEP 3 – FINAL QUESTION
  const btnFinalYes = document.getElementById("btn-final-yes");
  const btnFinalNo = document.getElementById("btn-final-no");

  if (btnFinalYes) {
    btnFinalYes.addEventListener("click", () => {
      showFinalScreen();
    });
  }

  if (btnFinalNo) {
    btnFinalNo.addEventListener("mousemove", (e) => {
      // Run away from cursor
      const btn = e.currentTarget;
      const moveX = (Math.random() - 0.5) * 200;
      const moveY = (Math.random() - 0.5) * 120;
      btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    btnFinalNo.addEventListener("click", () => {
      jiggleButton(btnFinalNo);
    });
  }

  // FINAL SCREEN – setup cat GIF + music
  function showFinalScreen() {
    showStep("step-final");

    const catImg = document.getElementById("cat-gif");
    const audio = document.getElementById("happy-audio");

    // 👉 Replace this URL with the actual GIF URL you copy from Tenor
    const HAPPY_CAT_GIF_URL =
      "https://tenor.com/view/cat-kitty-kitten-cat-meme-happy-cat-gif-18016892455935037863";

    if (catImg) {
      catImg.src = HAPPY_CAT_GIF_URL;
    }

    if (audio) {
      // Restart and play only on final YES
      audio.currentTime = 0;
      audio
        .play()
        .catch(() => {
          // If browser blocks autoplay, we just silently fail (user already interacted anyway)
        });
    }
  }
});

// Little wiggle animation for buttons
function jiggleButton(btn) {
  if (!btn) return;
  btn.style.transition = "transform 0.1s";
  btn.style.transform = "translateX(-4px)";
  setTimeout(() => {
    btn.style.transform = "translateX(4px)";
    setTimeout(() => {
      btn.style.transform = "translateX(0)";
    }, 80);
  }, 80);
}
