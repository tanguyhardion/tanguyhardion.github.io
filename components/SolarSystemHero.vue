<template>
  <div 
    class="solar-system-container" 
    @mousemove="handleMouseMove" 
    @mouseleave="handleMouseLeave"
    :style="cardTransformStyle"
  >
    <!-- Background Nebula Ambient Glow -->
    <div class="nebula-glow primary-nebula"></div>
    <div class="nebula-glow secondary-nebula"></div>

    <!-- SVG Solar System -->
    <svg 
      class="solar-system-svg" 
      viewBox="0 0 600 600" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <!-- Sun Radial Gradients -->
        <radialGradient id="sunGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF5EA" />
          <stop offset="35%" stop-color="#FF5277" />
          <stop offset="85%" stop-color="#FF3B5C" />
          <stop offset="100%" stop-color="#A80B2E" />
        </radialGradient>
        
        <radialGradient id="sunCoronaGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(255, 59, 92, 0.45)" />
          <stop offset="50%" stop-color="rgba(255, 59, 92, 0.15)" />
          <stop offset="100%" stop-color="rgba(255, 59, 92, 0)" />
        </radialGradient>

        <!-- Planet Gradients -->
        <radialGradient id="mercuryGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FF9EAA" />
          <stop offset="100%" stop-color="#FF3B5C" />
        </radialGradient>

        <radialGradient id="venusGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FFE79A" />
          <stop offset="100%" stop-color="#F59E0B" />
        </radialGradient>

        <radialGradient id="earthGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#93C5FD" />
          <stop offset="50%" stop-color="#38BDF8" />
          <stop offset="100%" stop-color="#1E40AF" />
        </radialGradient>

        <radialGradient id="marsGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FCA5A5" />
          <stop offset="100%" stop-color="#EF4444" />
        </radialGradient>

        <!-- Glow Filters -->
        <filter id="sunGlowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="planetGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Outer Grid Atmosphere Lines -->
      <circle cx="300" cy="300" r="280" class="outer-boundary" />

      <!-- Background Starfield & Sparkles -->
      <g class="starfield">
        <circle 
          v-for="star in backgroundStars" 
          :key="star.id" 
          :cx="star.x" 
          :cy="star.y" 
          :r="star.r" 
          class="star-node"
          :style="{ animationDelay: star.delay + 's', opacity: star.opacity }"
        />
        <!-- Sparkle Constellation Paths -->
        <path d="M 120 140 L 160 110 L 220 150" class="constellation-line" />
        <path d="M 440 450 L 490 410 L 520 480" class="constellation-line" />
      </g>

      <!-- Sun Visual Center -->
      <g class="sun-system">
        <circle cx="300" cy="300" r="60" class="sun-corona" fill="url(#sunCoronaGradient)" />
        <circle cx="300" cy="300" r="42" class="sun-outer-flare" />
        <circle cx="300" cy="300" r="30" class="sun-core" fill="url(#sunGradient)" filter="url(#sunGlowFilter)" />
        <circle cx="300" cy="300" r="14" class="sun-center-specular" />
      </g>

      <!-- Orbits and Orbiting Bodies -->
      <g 
        v-for="body in bodies" 
        :key="body.name" 
        class="orbit-layer"
      >
        <!-- Orbit Path -->
        <circle 
          cx="300" 
          cy="300" 
          :r="body.orbitRadius" 
          class="orbit-path"
          :class="{ 'dashed': body.dashed }"
        />

        <!-- Orbiting Group -->
        <g 
          class="orbit-rotator"
          :style="getOrbitStyle(body)"
        >
          <!-- Planet Ring if applicable -->
          <ellipse 
            v-if="body.hasRing"
            :cx="300 + body.orbitRadius" 
            cy="300" 
            :rx="body.radius * 2.2" 
            :ry="body.radius * 0.7" 
            class="planet-ring"
            :transform="`rotate(-20 ${300 + body.orbitRadius} 300)`"
          />

          <!-- Main Planet Circle -->
          <circle 
            :cx="300 + body.orbitRadius" 
            cy="300" 
            :r="body.radius" 
            :fill="`url(#${body.gradientId})`"
            class="planet-body"
            filter="url(#planetGlow)"
          />

          <!-- Sub-moon Orbit (if any) -->
          <g v-if="body.hasMoon" class="moon-system" :style="`transform-origin: ${300 + body.orbitRadius}px 300px;`">
            <circle :cx="300 + body.orbitRadius" cy="300" r="22" class="moon-orbit-line" />
            <circle :cx="300 + body.orbitRadius + 22" cy="300" r="3.5" class="moon-body" />
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface OrbitBody {
  name: string;
  orbitRadius: number;
  radius: number;
  gradientId: string;
  duration: number; // in seconds
  reverse?: boolean;
  dashed?: boolean;
  hasRing?: boolean;
  hasMoon?: boolean;
}

// Interactive 3D tilt state
const mouseX = ref(0);
const mouseY = ref(0);

const handleMouseMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  mouseX.value = x / (rect.width / 2);
  mouseY.value = y / (rect.height / 2);
};

const handleMouseLeave = () => {
  mouseX.value = 0;
  mouseY.value = 0;
};

const cardTransformStyle = computed(() => {
  const rotateX = -mouseY.value * 12;
  const rotateY = mouseX.value * 12;
  return {
    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  };
});

const bodies: OrbitBody[] = [
  {
    name: 'core-tech',
    orbitRadius: 85,
    radius: 7.5,
    gradientId: 'mercuryGrad',
    duration: 16
  },
  {
    name: 'architecture',
    orbitRadius: 145,
    radius: 9.5,
    gradientId: 'venusGrad',
    duration: 26,
    reverse: true,
    hasRing: true
  },
  {
    name: 'user-experience',
    orbitRadius: 215,
    radius: 11.5,
    gradientId: 'earthGrad',
    duration: 40,
    dashed: true,
    hasMoon: true
  },
  {
    name: 'cloud-devops',
    orbitRadius: 265,
    radius: 8,
    gradientId: 'marsGrad',
    duration: 54,
    reverse: true
  }
];

const getOrbitStyle = (body: OrbitBody) => {
  return {
    animationDuration: `${body.duration}s`,
    animationDirection: body.reverse ? 'reverse' : 'normal'
  };
};

const backgroundStars = [
  { id: 1, x: 70, y: 120, r: 1.8, delay: 0.2, opacity: 0.8 },
  { id: 2, x: 490, y: 90, r: 1.5, delay: 0.9, opacity: 0.6 },
  { id: 3, x: 130, y: 470, r: 2.2, delay: 1.4, opacity: 0.9 },
  { id: 4, x: 510, y: 460, r: 1.6, delay: 2.1, opacity: 0.7 },
  { id: 5, x: 280, y: 60, r: 1.2, delay: 0.5, opacity: 0.5 },
  { id: 6, x: 550, y: 260, r: 2.0, delay: 1.8, opacity: 0.85 },
  { id: 7, x: 60, y: 320, r: 1.4, delay: 2.6, opacity: 0.6 },
  { id: 8, x: 380, y: 530, r: 1.7, delay: 1.1, opacity: 0.75 }
];
</script>

<style lang="scss" scoped>
.solar-system-container {
  width: 100%;
  max-width: 540px;
  aspect-ratio: 1;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: transform 0.15s ease-out;
  transform-style: preserve-3d;
}

/* Ambient Nebula Glows */
.nebula-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  pointer-events: none;
  z-index: 0;

  &.primary-nebula {
    width: 280px;
    height: 280px;
    background: radial-gradient(circle, rgba(255, 59, 92, 0.18) 0%, rgba(255, 59, 92, 0) 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.secondary-nebula {
    width: 320px;
    height: 320px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(56, 189, 248, 0) 70%);
    top: 40%;
    left: 45%;
    transform: translate(-50%, -50%);
  }
}

/* SVG Solar System Elements */
.solar-system-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
  z-index: 1;
}

.outer-boundary {
  stroke: rgba(255, 255, 255, 0.04);
  stroke-width: 1;
  stroke-dasharray: 2 6;
  fill: none;
}

.starfield {
  .star-node {
    fill: #FFFFFF;
    animation: star-twinkle 3s ease-in-out infinite alternate;
  }
  .constellation-line {
    stroke: rgba(255, 255, 255, 0.06);
    stroke-width: 1;
    stroke-dasharray: 3 3;
    fill: none;
  }
}

.sun-corona {
  animation: corona-pulse 6s ease-in-out infinite alternate;
}

.sun-outer-flare {
  fill: none;
  stroke: rgba(255, 59, 92, 0.25);
  stroke-width: 1.5;
  stroke-dasharray: 8 14;
  animation: orbit-rotate 35s linear infinite;
  transform-origin: 300px 300px;
}

.sun-core {
  transition: transform 0.3s ease;
}

.sun-center-specular {
  fill: rgba(255, 255, 255, 0.35);
  filter: blur(2px);
}

/* Orbit Lines */
.orbit-path {
  stroke: rgba(255, 255, 255, 0.08);
  stroke-width: 1.5;
  fill: none;
  transition: stroke 0.3s ease, stroke-width 0.3s ease;

  &.dashed {
    stroke-dasharray: 5 7;
  }
}

/* Orbiting Group Rotators */
.orbit-rotator {
  transform-origin: 300px 300px;
  animation-name: orbit-rotate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.planet-body {
  transition: transform 0.25s ease, filter 0.25s ease;
}

.planet-ring {
  stroke: rgba(255, 215, 0, 0.65);
  stroke-width: 2;
  fill: none;
  pointer-events: none;
}

.moon-system {
  animation: orbit-rotate 8s linear infinite;

  .moon-orbit-line {
    stroke: rgba(255, 255, 255, 0.15);
    stroke-width: 1;
    fill: none;
  }

  .moon-body {
    fill: #E5E7EB;
    filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.8));
  }
}

@keyframes orbit-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes corona-pulse {
  0% { transform: scale(0.92); opacity: 0.4; }
  100% { transform: scale(1.15); opacity: 0.8; }
}

@keyframes star-twinkle {
  0% { opacity: 0.2; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.3); }
}
</style>

