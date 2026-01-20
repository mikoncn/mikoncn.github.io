// --- 1. 自定义鼠标逻辑 ---
const cursor = document.getElementById("custom-cursor");
document.addEventListener("mousemove", (e) => {
  gsap.to(cursor, {
    x: e.clientX - 10,
    y: e.clientY - 10,
    duration: 0.2,
    ease: "power2.out",
  });
});

// --- 2. Canvas 幽灵绿代码流 (升级版) ---
const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");
let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

const chars = "ｦｱｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄ0123456789X-Y-Z";
const fontSize = 14;
const columns = Math.floor(width / fontSize);
const drops = Array(columns).fill(0);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 5, 0, 0.05)";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#00ff0033";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > height && Math.random() > 0.98) drops[i] = 0;
    drops[i]++;
  }
}
setInterval(drawMatrix, 40);

// --- 3. GSAP 交互与启动序列 ---
const title = document.getElementById("main-title");

function glitchEffect() {
  const tl = gsap.timeline({
    onComplete: () => setTimeout(glitchEffect, Math.random() * 4000 + 2000),
  });
  tl.to(title, {
    duration: 0.1,
    skewX: 20,
    x: -10,
    opacity: 0.5,
    color: "#ff00ff",
  })
    .to(title, {
      duration: 0.1,
      skewX: -20,
      x: 10,
      opacity: 0.8,
      color: "#00ffff",
    })
    .to(title, { duration: 0.1, skewX: 0, x: 0, opacity: 1, color: "#00ff00" });
}
glitchEffect();

// 用户反馈：默认直接展示最终态，移除 initSequence 启动逻辑

// --- 4. 视角追踪微调 ---
const scene = document.getElementById("spline-scene");
window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  gsap.to(scene, {
    rotateY: x * 8, // 增加旋转幅度
    rotateX: -y * 8,
    duration: 1.2,
    ease: "power2.out",
  });
});

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});
