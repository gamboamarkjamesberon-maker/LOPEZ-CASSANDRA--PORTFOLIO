// =========================================================
// CASSANDRA NICOLE L. LOPEZ — INTERACTIVE COQUETTE ENGINE
// =========================================================

const THEMES = {
  velvet: {
    badge: "🎀 01 · VELVET RIBBON BALLET EDITION · 2026",
    symbol: "🎀",
    ribbonColor: "rgba(255, 105, 180, 0.20)"
  },
  glass: {
    badge: "🩰 02 · COQUETTE PEARL & FROSTED GLASS · 2026",
    symbol: "🩰",
    ribbonColor: "rgba(236, 72, 153, 0.20)"
  },
  cyber: {
    badge: "✨ 03 · CYBER COQUETTE · LOGIC & RIBBONS · 2026",
    symbol: "💗",
    ribbonColor: "rgba(255, 119, 188, 0.26)"
  },
  sakura: {
    badge: "🌸 04 · CHERRY BLOSSOM & BOWS · 2026",
    symbol: "🌸",
    ribbonColor: "rgba(213, 63, 140, 0.20)"
  }
};

let currentTheme = "velvet";
const htmlEl = document.documentElement;
const badgeEl = document.getElementById("themeBadge");
const themeButtons = document.querySelectorAll(".theme-btn");

themeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.getAttribute("data-theme-target");
    if (!THEMES[target]) return;
    currentTheme = target;
    htmlEl.setAttribute("data-theme", target);
    badgeEl.textContent = THEMES[target].badge;

    themeButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    particles.forEach((p) => {
      p.symbol = THEMES[target].symbol;
    });
  });
});

// Subtle 3D Tilt on Coquette Cards
document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// Flowing Satin Pink Ribbons & Floating Bows Canvas
const canvas = document.getElementById("coquetteCanvas");
const ctx = canvas.getContext("2d");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const mouse = { x: width / 2, y: height / 2 };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

const particles = Array.from({ length: 28 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  size: Math.random() * 14 + 12,
  speedY: Math.random() * 0.65 + 0.25,
  speedX: (Math.random() - 0.5) * 0.45,
  rot: Math.random() * Math.PI * 2,
  rotSpeed: (Math.random() - 0.5) * 0.02,
  symbol: THEMES.velvet.symbol
}));

let time = 0;
function render() {
  time += 0.02;
  ctx.clearRect(0, 0, width, height);

  // Flowing Pink Ribbons following cursor
  for (let r = 0; r < 3; r++) {
    ctx.beginPath();
    const baseY = height * (0.24 + r * 0.26);
    ctx.moveTo(0, baseY);
    for (let x = 0; x <= width; x += 28) {
      const dist = Math.hypot(x - mouse.x, baseY - mouse.y);
      const pull = Math.max(0, 1 - dist / 320) * (mouse.y - baseY) * 0.35;
      const wave = Math.sin(x * 0.004 + time + r) * 34;
      ctx.lineTo(x, baseY + wave + pull);
    }
    ctx.strokeStyle = THEMES[currentTheme].ribbonColor;
    ctx.lineWidth = 4 - r * 0.7;
    ctx.stroke();
  }

  // Floating Coquette Bows / Petals
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  particles.forEach((p) => {
    p.y += p.speedY;
    p.x += p.speedX + Math.sin(time + p.rot) * 0.3;
    p.rot += p.rotSpeed;

    if (p.y > height + 24) {
      p.y = -24;
      p.x = Math.random() * width;
    }

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.font = `${p.size}px sans-serif`;
    ctx.globalAlpha = 0.65;
    ctx.fillText(p.symbol, 0, 0);
    ctx.restore();
  });

  requestAnimationFrame(render);
}

render();
