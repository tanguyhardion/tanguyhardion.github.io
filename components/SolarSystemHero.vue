<template>
  <div class="solar-system-container">
    <!-- Background Nebula Ambient Glows -->
    <div class="nebula-glow primary-nebula"></div>
    <div class="nebula-glow secondary-nebula"></div>
    <div class="nebula-glow tertiary-nebula"></div>

    <!-- SVG Solar System -->
    <svg 
      class="solar-system-svg" 
      viewBox="0 0 600 600" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <!-- Sun Core Radial Gradient -->
        <radialGradient id="sunCoreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="25%" stop-color="#FFF5EA" />
          <stop offset="50%" stop-color="#FF5277" />
          <stop offset="85%" stop-color="#FF3B5C" />
          <stop offset="100%" stop-color="#990026" />
        </radialGradient>
        
        <radialGradient id="sunCoronaGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(255, 59, 92, 0.55)" />
          <stop offset="45%" stop-color="rgba(255, 59, 92, 0.2)" />
          <stop offset="80%" stop-color="rgba(255, 59, 92, 0.05)" />
          <stop offset="100%" stop-color="rgba(255, 59, 92, 0)" />
        </radialGradient>

        <radialGradient id="sunOuterHaloGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(255, 180, 50, 0.25)" />
          <stop offset="50%" stop-color="rgba(255, 59, 92, 0.12)" />
          <stop offset="100%" stop-color="rgba(0, 0, 0, 0)" />
        </radialGradient>

        <!-- Planet 3D Lighting Shadow (Terminator) -->
        <radialGradient id="planetShadowGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stop-color="rgba(255, 255, 255, 0.15)" />
          <stop offset="45%" stop-color="rgba(0, 0, 0, 0)" />
          <stop offset="70%" stop-color="rgba(5, 7, 15, 0.65)" />
          <stop offset="100%" stop-color="rgba(2, 3, 8, 0.92)" />
        </radialGradient>

        <!-- Inner Shimmer Gradient for internal moving light -->
        <radialGradient id="innerShimmerGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(255, 255, 255, 0.85)" />
          <stop offset="40%" stop-color="rgba(255, 255, 255, 0.4)" />
          <stop offset="75%" stop-color="rgba(255, 255, 255, 0.1)" />
          <stop offset="100%" stop-color="rgba(255, 255, 255, 0)" />
        </radialGradient>

        <!-- Mercury / Core Tech Gradient -->
        <radialGradient id="mercuryGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FFB4C2" />
          <stop offset="50%" stop-color="#FF5277" />
          <stop offset="100%" stop-color="#800A23" />
        </radialGradient>

        <!-- Venus / Architecture Gradient (Saturn style) -->
        <radialGradient id="venusGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FFF1B8" />
          <stop offset="45%" stop-color="#F59E0B" />
          <stop offset="85%" stop-color="#B45309" />
          <stop offset="100%" stop-color="#78350F" />
        </radialGradient>

        <!-- Ring Linear Gradient -->
        <linearGradient id="saturnRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(251, 191, 36, 0.85)" />
          <stop offset="30%" stop-color="rgba(245, 158, 11, 0.4)" />
          <stop offset="50%" stop-color="rgba(217, 119, 6, 0.1)" />
          <stop offset="70%" stop-color="rgba(251, 191, 36, 0.75)" />
          <stop offset="100%" stop-color="rgba(180, 83, 9, 0.2)" />
        </linearGradient>

        <!-- Earth / UX Gradient -->
        <radialGradient id="earthGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#BAE6FD" />
          <stop offset="35%" stop-color="#38BDF8" />
          <stop offset="70%" stop-color="#0284C7" />
          <stop offset="100%" stop-color="#0369A1" />
        </radialGradient>

        <!-- Mars / Cloud DevOps Gradient -->
        <radialGradient id="marsGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#FECACA" />
          <stop offset="40%" stop-color="#EF4444" />
          <stop offset="80%" stop-color="#B91C1C" />
          <stop offset="100%" stop-color="#7F1D1D" />
        </radialGradient>

        <!-- Glow Filters -->
        <filter id="sunGlowFilter" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="12" result="blur1" />
          <feGaussianBlur stdDeviation="5" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="planetGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <filter id="innerSoftBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.8" />
        </filter>
      </defs>

      <!-- Outer Boundary Atmosphere Grid -->
      <circle cx="300" cy="300" r="285" class="outer-boundary" />
      <circle cx="300" cy="300" r="280" class="outer-boundary-inner" />

      <!-- Deep Space Starfield & Constellation Grid -->
      <g class="starfield">
        <circle 
          v-for="star in backgroundStars" 
          :key="star.id" 
          :cx="star.x" 
          :cy="star.y" 
          :r="star.r" 
          class="star-node"
          :style="{ animationDelay: star.delay + 's', opacity: star.opacity, fill: star.color || '#FFFFFF' }"
        />
        <!-- Dynamic Constellation Lines -->
        <path d="M 90 120 L 140 100 L 190 145 M 140 100 L 110 50" class="constellation-line" />
        <path d="M 440 470 L 490 430 L 530 490 M 490 430 L 540 390" class="constellation-line" />
        <path d="M 480 110 L 530 140 L 510 190" class="constellation-line" />
      </g>

      <!-- Cosmic Comet / Shooting Star -->
      <g class="comet-group">
        <path d="M 460 70 L 340 150" class="comet-tail" />
        <circle cx="460" cy="70" r="2" class="comet-head" />
      </g>

      <!-- Asteroid Belt Ring (Between Orbit 2 & 3) -->
      <g class="asteroid-belt">
        <circle 
          v-for="ast in asteroids" 
          :key="ast.id" 
          :cx="ast.cx" 
          :cy="ast.cy" 
          :r="ast.r" 
          class="asteroid-particle"
          :style="{ opacity: ast.opacity, transformOrigin: '300px 300px', animationDuration: ast.speed + 's' }"
        />
      </g>

      <!-- Clean Radiant Sun Center System -->
      <g class="sun-system">
        <!-- Outer Ambient Radiant Glows -->
        <circle cx="300" cy="300" r="85" class="sun-outer-halo" fill="url(#sunOuterHaloGrad)" />
        <circle cx="300" cy="300" r="60" class="sun-corona" fill="url(#sunCoronaGrad)" />
        
        <!-- Rotating Delicate Orbit Flare Ring -->
        <circle cx="300" cy="300" r="42" class="sun-outer-flare" />
        
        <!-- Clean Glowing Sun Core -->
        <circle 
          cx="300" 
          cy="300" 
          r="30" 
          class="sun-core" 
          fill="url(#sunCoreGrad)" 
          filter="url(#sunGlowFilter)" 
        />
      </g>

      <!-- Orbits and Orbiting Bodies -->
      <g 
        v-for="body in bodies" 
        :key="body.id" 
        class="orbit-layer"
      >
        <!-- Orbit Path Circle -->
        <circle 
          cx="300" 
          cy="300" 
          :r="body.orbitRadius" 
          class="orbit-path"
          :class="{ 'dashed': body.dashed }"
        />

        <!-- Orbit Rotator Group -->
        <g 
          class="orbit-rotator"
          :style="getOrbitStyle(body)"
        >
          <!-- BACK Portion of Saturn-like Ring (drawn behind planet) -->
          <g v-if="body.hasRing" class="ring-back">
            <ellipse 
              :cx="300 + body.orbitRadius" 
              cy="300" 
              :rx="body.radius * 2.4" 
              :ry="body.radius * 0.75" 
              fill="none"
              stroke="url(#saturnRingGrad)"
              stroke-width="3"
              class="planet-ring-back"
              :transform="`rotate(-22 ${300 + body.orbitRadius} 300)`"
            />
          </g>

          <!-- Main Planet Circle -->
          <circle 
            :cx="300 + body.orbitRadius" 
            cy="300" 
            :r="body.radius" 
            :fill="`url(#${body.gradientId})`"
            class="planet-body"
            filter="url(#planetGlow)"
          />

          <!-- Internal Moving Glow (Moves inside the planet) -->
          <circle 
            :cx="300 + body.orbitRadius - body.radius * 0.15" 
            :cy="300 - body.radius * 0.15" 
            :r="body.radius * 0.65" 
            fill="url(#innerShimmerGrad)" 
            filter="url(#innerSoftBlur)"
            class="planet-inner-glow"
            :style="{ animationDuration: (body.duration * 0.35) + 's' }"
          />

          <!-- Surface Details (Continents/Bands/Craters) -->
          <!-- Earth Continents/Clouds -->
          <g v-if="body.id === 'user-experience'" class="earth-details">
            <path 
              :d="`M ${300 + body.orbitRadius - 6} 295 Q ${300 + body.orbitRadius - 2} 292 ${300 + body.orbitRadius + 4} 297 Q ${300 + body.orbitRadius + 2} 304 ${300 + body.orbitRadius - 4} 302 Z`" 
              fill="#22C55E" 
              opacity="0.65" 
            />
            <path 
              :d="`M ${300 + body.orbitRadius - 3} 303 Q ${300 + body.orbitRadius + 5} 305 ${300 + body.orbitRadius + 2} 309 Z`" 
              fill="#15803D" 
              opacity="0.6" 
            />
            <!-- Atmosphere Cloud Swirl -->
            <path 
              :d="`M ${300 + body.orbitRadius - 8} 298 Q ${300 + body.orbitRadius} 294 ${300 + body.orbitRadius + 8} 300`" 
              stroke="#FFFFFF" 
              stroke-width="1.2" 
              fill="none" 
              opacity="0.5" 
            />
          </g>

          <!-- Venus/Architecture Gas Bands -->
          <g v-if="body.id === 'architecture'" class="venus-bands">
            <line 
              :x1="300 + body.orbitRadius - body.radius + 1" 
              y1="297" 
              :x2="300 + body.orbitRadius + body.radius - 1" 
              y2="297" 
              stroke="rgba(255, 255, 255, 0.3)" 
              stroke-width="1.5" 
            />
            <line 
              :x1="300 + body.orbitRadius - body.radius + 2" 
              y1="303" 
              :x2="300 + body.orbitRadius + body.radius - 2" 
              y2="303" 
              stroke="rgba(180, 83, 9, 0.4)" 
              stroke-width="1.2" 
            />
          </g>

          <!-- Mars Ice Cap -->
          <g v-if="body.id === 'cloud-devops'" class="mars-details">
            <ellipse 
              :cx="300 + body.orbitRadius - 2" 
              :cy="300 - body.radius + 2.5" 
              rx="3" 
              ry="1.5" 
              fill="#FFFFFF" 
              opacity="0.8" 
            />
          </g>

          <!-- 3D Shadow Overlay (Terminator) -->
          <circle 
            :cx="300 + body.orbitRadius" 
            cy="300" 
            :r="body.radius" 
            fill="url(#planetShadowGrad)" 
            class="planet-shadow"
          />

          <!-- Atmosphere Rim Glow -->
          <circle 
            :cx="300 + body.orbitRadius" 
            cy="300" 
            :r="body.radius + 0.5" 
            fill="none"
            :stroke="body.color"
            stroke-width="0.8"
            opacity="0.6"
            class="planet-atmosphere"
          />

          <!-- FRONT Portion of Saturn-like Ring (drawn in front of planet) -->
          <g v-if="body.hasRing" class="ring-front">
            <ellipse 
              :cx="300 + body.orbitRadius" 
              cy="300" 
              :rx="body.radius * 2.4" 
              :ry="body.radius * 0.75" 
              fill="none"
              stroke="url(#saturnRingGrad)"
              stroke-width="3"
              stroke-dasharray="32 20"
              class="planet-ring-front"
              :transform="`rotate(-22 ${300 + body.orbitRadius} 300)`"
            />
          </g>

          <!-- Sub-moon System (Earth's Moon) -->
          <g 
            v-if="body.hasMoon" 
            class="moon-system" 
            :style="`transform-origin: ${300 + body.orbitRadius}px 300px;`"
          >
            <circle :cx="300 + body.orbitRadius" cy="300" r="23" class="moon-orbit-line" />
            <circle :cx="300 + body.orbitRadius + 23" cy="300" r="3.2" class="moon-body" />
          </g>

          <!-- Sub-satellite System (Mars Satellite) -->
          <g 
            v-if="body.hasSatellite" 
            class="satellite-system" 
            :style="`transform-origin: ${300 + body.orbitRadius}px 300px;`"
          >
            <circle :cx="300 + body.orbitRadius" cy="300" r="18" class="satellite-orbit-line" />
            <g :transform="`translate(${300 + body.orbitRadius + 18}, 300)`" class="satellite-body">
              <rect x="-2" y="-1.5" width="4" height="3" fill="#E2E8F0" rx="0.5" />
              <line x1="-5" y1="0" x2="5" y2="0" stroke="#38BDF8" stroke-width="1" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
interface OrbitBody {
  id: string;
  name: string;
  orbitRadius: number;
  radius: number;
  gradientId: string;
  duration: number; // in seconds
  reverse?: boolean;
  dashed?: boolean;
  hasRing?: boolean;
  hasMoon?: boolean;
  hasSatellite?: boolean;
  color: string;
}

const bodies: OrbitBody[] = [
  {
    id: 'core-tech',
    name: 'Core Systems',
    orbitRadius: 90,
    radius: 8.5,
    gradientId: 'mercuryGrad',
    duration: 18,
    color: '#FF5277'
  },
  {
    id: 'architecture',
    name: 'Architecture',
    orbitRadius: 152,
    radius: 11,
    gradientId: 'venusGrad',
    duration: 28,
    reverse: true,
    hasRing: true,
    color: '#F59E0B'
  },
  {
    id: 'user-experience',
    name: 'User Experience',
    orbitRadius: 220,
    radius: 13,
    gradientId: 'earthGrad',
    duration: 42,
    dashed: true,
    hasMoon: true,
    color: '#38BDF8'
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    orbitRadius: 270,
    radius: 9.5,
    gradientId: 'marsGrad',
    duration: 56,
    reverse: true,
    hasSatellite: true,
    color: '#EF4444'
  }
];

const getOrbitStyle = (body: OrbitBody) => {
  return {
    animationDuration: `${body.duration}s`,
    animationDirection: body.reverse ? 'reverse' : 'normal'
  };
};

// Generated starfield data
const backgroundStars = [
  { id: 1, x: 65, y: 110, r: 1.8, delay: 0.2, opacity: 0.8, color: '#93C5FD' },
  { id: 2, x: 495, y: 85, r: 1.5, delay: 0.9, opacity: 0.75, color: '#FFE79A' },
  { id: 3, x: 120, y: 480, r: 2.2, delay: 1.4, opacity: 0.9, color: '#FFFFFF' },
  { id: 4, x: 520, y: 465, r: 1.6, delay: 2.1, opacity: 0.7, color: '#FF9EAA' },
  { id: 5, x: 275, y: 55, r: 1.3, delay: 0.5, opacity: 0.6, color: '#FFFFFF' },
  { id: 6, x: 555, y: 250, r: 2.1, delay: 1.8, opacity: 0.85, color: '#38BDF8' },
  { id: 7, x: 50, y: 310, r: 1.4, delay: 2.6, opacity: 0.65, color: '#FFFFFF' },
  { id: 8, x: 375, y: 540, r: 1.7, delay: 1.1, opacity: 0.8, color: '#FCD34D' },
  { id: 9, x: 210, y: 90, r: 1.2, delay: 3.0, opacity: 0.5, color: '#FFFFFF' },
  { id: 10, x: 430, y: 170, r: 1.9, delay: 0.7, opacity: 0.85, color: '#A7F3D0' },
  { id: 11, x: 160, y: 380, r: 1.5, delay: 2.4, opacity: 0.7, color: '#FFFFFF' },
  { id: 12, x: 410, y: 390, r: 1.3, delay: 1.6, opacity: 0.6, color: '#E0E7FF' }
];

// Asteroid belt particles
const asteroids = Array.from({ length: 22 }, (_, i) => {
  const angle = (i / 22) * Math.PI * 2 + (Math.random() * 0.2);
  const radius = 182 + (Math.random() * 12 - 6);
  return {
    id: i,
    cx: 300 + Math.cos(angle) * radius,
    cy: 300 + Math.sin(angle) * radius,
    r: Math.random() > 0.6 ? 1.4 : 0.9,
    opacity: 0.35 + Math.random() * 0.45,
    speed: 35 + (i % 5) * 4
  };
});
</script>

<style lang="scss" scoped>
.solar-system-container {
  width: 100%;
  max-width: 560px;
  aspect-ratio: 1;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Ambient Nebula Glows */
.nebula-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(65px);
  pointer-events: none;
  z-index: 0;

  &.primary-nebula {
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(255, 59, 92, 0.2) 0%, rgba(255, 59, 92, 0) 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.secondary-nebula {
    width: 340px;
    height: 340px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.14) 0%, rgba(56, 189, 248, 0) 70%);
    top: 38%;
    left: 42%;
    transform: translate(-50%, -50%);
  }

  &.tertiary-nebula {
    width: 260px;
    height: 260px;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0) 70%);
    top: 62%;
    left: 58%;
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
  stroke: rgba(255, 255, 255, 0.05);
  stroke-width: 1;
  stroke-dasharray: 2 6;
  fill: none;
}

.outer-boundary-inner {
  stroke: rgba(255, 255, 255, 0.025);
  stroke-width: 1;
  fill: none;
}

.starfield {
  .star-node {
    animation: star-twinkle 3.5s ease-in-out infinite alternate;
  }
  .constellation-line {
    stroke: rgba(255, 255, 255, 0.05);
    stroke-width: 0.8;
    stroke-dasharray: 3 4;
    fill: none;
  }
}

/* Comet Animation */
.comet-group {
  .comet-tail {
    stroke: url(#sunCoronaGrad);
    stroke-width: 1.5;
    stroke-dasharray: 120;
    stroke-dashoffset: 120;
    animation: comet-pass 12s ease-in-out infinite 3s;
    fill: none;
  }
  .comet-head {
    fill: #FFFFFF;
    opacity: 0;
    animation: comet-head-pass 12s ease-in-out infinite 3s;
  }
}

/* Asteroids */
.asteroid-belt {
  .asteroid-particle {
    fill: #CBD5E1;
    animation: orbit-rotate linear infinite;
  }
}

/* Sun Details */
.sun-corona {
  animation: corona-pulse 5s ease-in-out infinite alternate;
  transform-origin: 300px 300px;
}

.sun-outer-halo {
  animation: corona-pulse 7s ease-in-out infinite alternate-reverse;
  transform-origin: 300px 300px;
}

.sun-outer-flare {
  fill: none;
  stroke: rgba(255, 59, 92, 0.35);
  stroke-width: 1.5;
  stroke-dasharray: 10 16;
  animation: orbit-rotate 30s linear infinite;
  transform-origin: 300px 300px;
}

/* Orbit Lines */
.orbit-path {
  stroke: rgba(255, 255, 255, 0.08);
  stroke-width: 1.5;
  fill: none;

  &.dashed {
    stroke-dasharray: 6 8;
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

/* Internal Moving Glow inside Planets */
.planet-inner-glow {
  pointer-events: none;
  mix-blend-mode: overlay;
  animation: inner-glow-drift ease-in-out infinite alternate;
}

.planet-ring-back,
.planet-ring-front {
  pointer-events: none;
}

.moon-system {
  animation: orbit-rotate 7s linear infinite;

  .moon-orbit-line {
    stroke: rgba(255, 255, 255, 0.18);
    stroke-width: 1;
    fill: none;
  }

  .moon-body {
    fill: #F1F5F9;
    filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.9));
  }
}

.satellite-system {
  animation: orbit-rotate 10s linear infinite reverse;

  .satellite-orbit-line {
    stroke: rgba(239, 68, 68, 0.2);
    stroke-width: 0.8;
    stroke-dasharray: 2 3;
    fill: none;
  }
}

/* Animations */
@keyframes orbit-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes inner-glow-drift {
  0% {
    transform: translate(-3px, -2px) scale(0.85);
    opacity: 0.3;
  }
  50% {
    transform: translate(2.5px, 2px) scale(1.18);
    opacity: 0.85;
  }
  100% {
    transform: translate(-1.5px, 2.5px) scale(0.92);
    opacity: 0.4;
  }
}

@keyframes corona-pulse {
  0% { transform: scale(0.92); opacity: 0.5; }
  100% { transform: scale(1.12); opacity: 0.85; }
}

@keyframes star-twinkle {
  0% { opacity: 0.25; transform: scale(0.85); }
  100% { opacity: 1; transform: scale(1.25); }
}

@keyframes comet-pass {
  0% { stroke-dashoffset: 120; opacity: 0; }
  20% { opacity: 0.8; }
  40% { stroke-dashoffset: 0; opacity: 0; }
  100% { stroke-dashoffset: 0; opacity: 0; }
}

@keyframes comet-head-pass {
  0% { opacity: 0; transform: translate(0, 0); }
  10% { opacity: 1; }
  35% { opacity: 0; transform: translate(-120px, 80px); }
  100% { opacity: 0; transform: translate(-120px, 80px); }
}
</style>
