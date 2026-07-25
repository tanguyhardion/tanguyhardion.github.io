<template>
  <div class="solar-system-container">
    <svg class="solar-system-svg" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Sun Core -->
      <circle cx="300" cy="300" r="28" class="sun-core" />
      <circle cx="300" cy="300" r="45" class="sun-glow" />

      <!-- Orbit 1 - Inner Tech Planet -->
      <circle cx="300" cy="300" r="90" class="orbit-line" />
      <g class="orbit-group orbit-group-1">
        <circle cx="390" cy="300" r="8" class="planet planet-crimson" />
      </g>

      <!-- Orbit 2 - Middle Planet with Ring -->
      <circle cx="300" cy="300" r="160" class="orbit-line" />
      <g class="orbit-group orbit-group-2">
        <ellipse cx="460" cy="300" rx="14" ry="5" class="planet-ring" />
        <circle cx="460" cy="300" r="10" class="planet planet-gold" />
      </g>

      <!-- Orbit 3 - Outer Blue Planet with Moon -->
      <circle cx="300" cy="300" r="230" class="orbit-line dashed" />
      <g class="orbit-group orbit-group-3">
        <circle cx="530" cy="300" r="12" class="planet planet-blue" />
        <!-- Moon Orbit -->
        <circle cx="530" cy="300" r="24" class="moon-orbit" />
        <circle cx="554" cy="300" r="4" class="moon" />
      </g>

      <!-- Constellation Stars & Sparkles -->
      <circle cx="120" cy="140" r="2" class="star star-1" />
      <circle cx="480" cy="110" r="1.5" class="star star-2" />
      <circle cx="160" cy="460" r="2.5" class="star star-3" />
      <circle cx="440" cy="490" r="2" class="star star-4" />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.solar-system-container {
  width: 100%;
  max-width: 520px;
  aspect-ratio: 1;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.solar-system-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.sun-core {
  fill: #FF3B5C;
  filter: drop-shadow(0 0 20px rgba(255, 59, 92, 0.9));
}

.sun-glow {
  fill: rgba(255, 59, 92, 0.15);
  animation: pulse-glow 4s ease-in-out infinite alternate;
}

.orbit-line {
  stroke: rgba(255, 255, 255, 0.08);
  stroke-width: 1.5;
  fill: none;

  &.dashed {
    stroke-dasharray: 4 6;
  }
}

.orbit-group {
  transform-origin: 300px 300px;
}

.orbit-group-1 {
  animation: orbit-rotate 18s linear infinite;
}

.orbit-group-2 {
  animation: orbit-rotate 30s linear infinite reverse;
}

.orbit-group-3 {
  animation: orbit-rotate 45s linear infinite;
}

.planet {
  &.planet-crimson {
    fill: #FF3B5C;
    filter: drop-shadow(0 0 10px rgba(255, 59, 92, 0.8));
  }
  &.planet-gold {
    fill: #FFD700;
    filter: drop-shadow(0 0 12px rgba(255, 215, 0, 0.8));
  }
  &.planet-blue {
    fill: #38BDF8;
    filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.8));
  }
}

.planet-ring {
  stroke: rgba(255, 215, 0, 0.6);
  stroke-width: 1.5;
  fill: none;
}

.moon-orbit {
  stroke: rgba(255, 255, 255, 0.15);
  stroke-width: 1;
  fill: none;
}

.moon {
  fill: #E5E7EB;
}

.star {
  fill: #FFFFFF;
  animation: star-twinkle 3s ease-in-out infinite alternate;

  &.star-2 { animation-delay: 0.8s; }
  &.star-3 { animation-delay: 1.6s; }
  &.star-4 { animation-delay: 2.2s; }
}

@keyframes orbit-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse-glow {
  0% { transform: scale(0.9); opacity: 0.5; }
  100% { transform: scale(1.2); opacity: 1; }
}

@keyframes star-twinkle {
  0% { opacity: 0.2; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.3); }
}
</style>
