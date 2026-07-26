<template>
  <div v-if="isHomePage" class="shooting-stars-container" aria-hidden="true">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { useRoute } from '#imports';

const route = useRoute();
const isHomePage = computed(() => route.path === '/');

const canvasRef = ref<HTMLCanvasElement | null>(null);

interface Star {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number; // in radians
  opacity: number;
  maxOpacity: number;
  size: number;
  headColor: string;
  tailColor: string;
  fadeIn: boolean;
  life: number;
  maxLife: number;
}

let animationFrameId: number | null = null;
let stars: Star[] = [];
let width = 0;
let height = 0;

const createStar = (): Star => {
  // Allow varied trajectories: mostly top-left to bottom-right (15° to 70°), occasionally top-right to bottom-left (110° to 155°)
  const isLeftToRight = Math.random() > 0.25;
  const angleDeg = isLeftToRight
    ? 15 + Math.random() * 55    // 15° to 70°
    : 110 + Math.random() * 45;  // 110° to 155°
  const angle = (angleDeg * Math.PI) / 180;

  let x: number, y: number;

  if (isLeftToRight) {
    const spawnTop = Math.random() < 0.65;
    if (spawnTop) {
      x = Math.random() * (width + 400) - 200;
      y = -60 - Math.random() * 100;
    } else {
      x = -120 - Math.random() * 60;
      y = Math.random() * (height * 0.8);
    }
  } else {
    // Right-to-left downward path
    const spawnTop = Math.random() < 0.65;
    if (spawnTop) {
      x = Math.random() * (width + 400) - 100;
      y = -60 - Math.random() * 100;
    } else {
      x = width + 120 + Math.random() * 60;
      y = Math.random() * (height * 0.8);
    }
  }

  const speed = 5 + Math.random() * 7;
  const length = 100 + Math.random() * 140;
  const maxOpacity = 0.5 + Math.random() * 0.4;
  const size = 1.1 + Math.random() * 1.2;
  const maxLife = 110 + Math.random() * 90;

  // Vibrant color palettes matching portfolio crimson/purple glow theme
  const colors = [
    { head: '#FFFFFF', tail: 'rgba(255, 59, 92, ' },   // Crimson glow
    { head: '#FFF0F5', tail: 'rgba(255, 107, 139, ' }, // Soft pinkish red
    { head: '#FFFFFF', tail: 'rgba(168, 85, 247, ' },  // Electric purple
    { head: '#F0F9FF', tail: 'rgba(56, 189, 248, ' },  // Cyan accent star
  ];

  const colorChoice = colors[Math.floor(Math.random() * colors.length)];

  return {
    x,
    y,
    length,
    speed,
    angle,
    opacity: 0,
    maxOpacity,
    size,
    headColor: colorChoice.head,
    tailColor: colorChoice.tail,
    fadeIn: true,
    life: 0,
    maxLife,
  };
};

const initCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const handleResize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  };

  handleResize();
  window.addEventListener('resize', handleResize);

  // Initialize a subtle pool of 2 shooting stars at start
  stars = Array.from({ length: 2 }, () => {
    const star = createStar();
    star.life = Math.random() * star.maxLife; // stagger progress
    return star;
  });

  const render = () => {
    ctx.clearRect(0, 0, width, height);

    // Occasional spawn (max 3-4 active stars at a time)
    if (stars.length < 3 && Math.random() < 0.012) {
      stars.push(createStar());
    }

    for (let i = stars.length - 1; i >= 0; i--) {
      const star = stars[i];
      star.life++;

      // Update position along vector
      star.x += Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;

      // Fade logic
      const lifeRatio = star.life / star.maxLife;
      if (lifeRatio < 0.25) {
        star.opacity = (lifeRatio / 0.25) * star.maxOpacity;
      } else if (lifeRatio > 0.7) {
        star.opacity = ((1 - lifeRatio) / 0.3) * star.maxOpacity;
      } else {
        star.opacity = star.maxOpacity;
      }

      if (star.life >= star.maxLife || star.x > width + star.length || star.y > height + star.length) {
        stars.splice(i, 1);
        continue;
      }

      // Draw shooting star tail gradient
      const tailX = star.x - Math.cos(star.angle) * star.length;
      const tailY = star.y - Math.sin(star.angle) * star.length;

      const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
      gradient.addColorStop(0, star.tailColor + `${star.opacity.toFixed(3)})`);
      gradient.addColorStop(0.3, star.tailColor + `${(star.opacity * 0.5).toFixed(3)})`);
      gradient.addColorStop(1, star.tailColor + '0)');

      ctx.beginPath();
      ctx.moveTo(star.x, star.y);
      ctx.lineTo(tailX, tailY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = star.size;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Glowing bright head dot
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size * 1.2, 0, Math.PI * 2);
      ctx.fillStyle = star.headColor;
      ctx.globalAlpha = Math.min(1, star.opacity * 1.2);
      ctx.shadowBlur = 10;
      ctx.shadowColor = star.headColor;
      ctx.fill();
      ctx.shadowBlur = 0; // reset
      ctx.globalAlpha = 1;
    }

    animationFrameId = requestAnimationFrame(render);
  };

  render();

  return () => {
    window.removeEventListener('resize', handleResize);
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
  };
};

let cleanupCanvas: (() => void) | undefined;

onMounted(() => {
  if (isHomePage.value) {
    cleanupCanvas = initCanvas();
  }
});

watch(isHomePage, (newVal) => {
  if (cleanupCanvas) {
    cleanupCanvas();
    cleanupCanvas = undefined;
  }
  if (newVal) {
    setTimeout(() => {
      cleanupCanvas = initCanvas();
    }, 50);
  }
});

onUnmounted(() => {
  if (cleanupCanvas) {
    cleanupCanvas();
  }
});
</script>

<style lang="scss" scoped>
.shooting-stars-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1; /* Above backlight overlay, behind interactive components */
  overflow: hidden;

  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
