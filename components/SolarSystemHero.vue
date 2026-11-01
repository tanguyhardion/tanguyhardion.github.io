<template>
  <div class="solar-system-container" :class="{ 'is-ready': isReady }">
    <!-- Background Nebula Ambient Glows -->
    <div class="nebula-glow primary-nebula"></div>
    <div class="nebula-glow secondary-nebula"></div>
    <div class="nebula-glow tertiary-nebula"></div>

    <!-- Shown during SSR, while the shader builds and when WebGL2 is unavailable.
         Framed like the first frame of the intro so it crossfades into the canvas. -->
    <div class="solar-loader" :style="loaderStyle" aria-hidden="true">
      <div class="loader-plane" :style="loaderPlaneStyle">
        <div v-for="planet in planets" :key="planet.id" class="loader-orbit" :style="loaderOrbitStyle(planet)">
          <span class="loader-planet"></span>
        </div>
      </div>
      <div class="loader-halo"></div>
      <div class="loader-sun"></div>
    </div>

    <canvas ref="canvasRef" class="solar-system-canvas" aria-hidden="true"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { BODY_COUNT, BODY_IDS, NOISE_SIZE, fragmentShader, vertexShader } from '~/utils/solarSystemShader';

interface OrbitBody {
  id: number;
  orbitRadius: number;
  radius: number;
  duration: number; // in seconds
  startAngle: number; // in radians
  color: string; // loader only, matches TRAILS in the shader
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
const isReady = ref(false);

const TAU = Math.PI * 2;
const SUN_RADIUS = 0.16;

// Camera framing: a slightly rolled, elevated view of the orbital plane
const CAMERA_DISTANCE = 6;
const VIEW_HALF_WIDTH = 1.45;
const CAMERA_ROLL = -0.24;
const CAMERA_ELEVATION = 0.5;
const INTRO_ELEVATION = 1.18;
const INTRO_DURATION = 2.8; // in seconds
const INTRO_ORBIT_SKIP = 7; // in seconds of orbital time played back during the intro

const MAX_DPR = 2;
const MIN_RESOLUTION_SCALE = 0.55;
const SLOW_FRAME_MS = 26;
const TOO_SLOW_FRAME_MS = 70;
const LOADER_SPEEDUP = 4;

// Real order from the sun, with the asteroid belt between mars and jupiter.
// Distances are compressed to fit the frame, durations follow Kepler's third law for them.
// Orbit radii and order must stay in sync with ORBITS and TRAILS in the shader
const planets: OrbitBody[] = [
  { id: BODY_IDS.mercury, orbitRadius: 0.225, radius: 0.032, duration: 12, startAngle: 2.5, color: '#B8B3AD' },
  { id: BODY_IDS.venus, orbitRadius: 0.325, radius: 0.066, duration: 21, startAngle: -2.4, color: '#F2CC80' },
  { id: BODY_IDS.earth, orbitRadius: 0.525, radius: 0.08, duration: 44, startAngle: 1.95, color: '#38BDF8' },
  { id: BODY_IDS.mars, orbitRadius: 0.75, radius: 0.062, duration: 75, startAngle: -1.05, color: '#EF4444' },
  { id: BODY_IDS.jupiter, orbitRadius: 1.03, radius: 0.09, duration: 121, startAngle: 0.25, color: '#F59E0B' },
  { id: BODY_IDS.saturn, orbitRadius: 1.275, radius: 0.066, duration: 167, startAngle: 3.4, color: '#D6B880' }
];

const loaderSquash = Math.sin(INTRO_ELEVATION);
const loaderStyle = { '--sun': `${(SUN_RADIUS / VIEW_HALF_WIDTH) * 100}%` };
const loaderPlaneStyle = {
  '--squash': loaderSquash,
  transform: `rotate(${CAMERA_ROLL}rad) scaleY(${loaderSquash})`
};

const loaderOrbitStyle = (planet: OrbitBody) => ({
  '--orbit': `${(planet.orbitRadius / VIEW_HALF_WIDTH) * 100}%`,
  '--planet': `${(planet.radius / VIEW_HALF_WIDTH) * 100}%`,
  '--start': `${planet.startAngle}rad`,
  '--period': `${planet.duration / LOADER_SPEEDUP}s`,
  '--color': planet.color
});

const MOON_RADIUS = 0.019;
const MOON_DISTANCE = 0.112;
const MOON_DURATION = 9;
const SATELLITE_RADIUS = 0.0065;
const SATELLITE_DISTANCE = 0.083;
const SATELLITE_DURATION = 6;

const compile = (gl: WebGL2RenderingContext, type: number, source: string) => {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
};

// Status is deliberately not queried here, that would block until the driver finishes
const createProgram = (gl: WebGL2RenderingContext) => {
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexShader);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentShader);
  const program = gl.createProgram();
  if (!vertex || !fragment || !program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  return program;
};

const createNoiseTexture = (gl: WebGL2RenderingContext) => {
  // Seeded so the planets look the same on every visit
  const data = new Uint8Array(NOISE_SIZE ** 3);
  let seed = 20261101;
  for (let i = 0; i < data.length; i++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) | 0;
    data[i] = seed >>> 24;
  }

  gl.bindTexture(gl.TEXTURE_3D, gl.createTexture());
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  gl.texImage3D(gl.TEXTURE_3D, 0, gl.R8, NOISE_SIZE, NOISE_SIZE, NOISE_SIZE, 0, gl.RED, gl.UNSIGNED_BYTE, data);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.REPEAT);
};

const cross = (a: number[], b: number[]) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0]
];

const normalize = (v: number[]) => {
  const length = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / length, v[1] / length, v[2] / length];
};

const initScene = (canvas: HTMLCanvasElement) => {
  const gl = canvas.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power'
  });
  if (!gl) return;

  const program = createProgram(gl);
  if (!program) return;

  // Lets the driver compile off the main thread so the page stays responsive meanwhile
  const parallelCompile = gl.getExtension('KHR_parallel_shader_compile');
  let pollId: number | null = null;
  let cleanupRun: (() => void) | undefined;

  const waitForProgram = () => {
    if (parallelCompile && !gl.getProgramParameter(program, parallelCompile.COMPLETION_STATUS_KHR)) {
      pollId = requestAnimationFrame(waitForProgram);
      return;
    }

    pollId = null;
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
      cleanupRun = runScene(canvas, gl, program);
    } else {
      console.warn('Solar system shader failed to build:', gl.getProgramInfoLog(program));
    }
  };

  pollId = requestAnimationFrame(waitForProgram);

  return () => {
    if (pollId !== null) cancelAnimationFrame(pollId);
    cleanupRun?.();
  };
};

const runScene = (canvas: HTMLCanvasElement, gl: WebGL2RenderingContext, program: WebGLProgram) => {
  gl.useProgram(program);
  gl.bindVertexArray(gl.createVertexArray());
  createNoiseTexture(gl);

  const location = (name: string) => gl.getUniformLocation(program, name);
  const uniforms = {
    res: location('uRes'),
    time: location('uTime'),
    camPos: location('uCamPos'),
    cam: location('uCam'),
    focal: location('uFocal'),
    body: location('uBody'),
    order: location('uOrder'),
    angle: location('uAngle')
  };

  gl.uniform1f(uniforms.focal, CAMERA_DISTANCE / VIEW_HALF_WIDTH);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const bodies = new Float32Array(BODY_COUNT * 4);
  const angles = new Float32Array(planets.length);
  const order = new Int32Array(BODY_COUNT);
  const depths = new Float32Array(BODY_COUNT);

  let time = 0;
  let resolutionScale = 1;
  let frameId: number | null = null;
  let lastFrame = 0;
  let isVisible = true;
  let isTooSlow = false;

  // Smoothed pointer parallax, -1 to 1 on each axis
  let targetX = 0;
  let targetY = 0;
  let pointerX = 0;
  let pointerY = 0;

  // Rolling frame cost, used to lower resolution on slow GPUs
  let slowSum = 0;
  let slowSamples = 0;

  const setBody = (id: number, x: number, y: number, z: number, radius: number) => {
    bodies.set([x, y, z, radius], id * 4);
  };

  const updateBodies = (orbitTime: number) => {
    setBody(BODY_IDS.sun, 0, 0, 0, SUN_RADIUS);

    planets.forEach((planet, index) => {
      const angle = planet.startAngle + (orbitTime / planet.duration) * TAU;
      angles[index] = ((angle % TAU) + TAU) % TAU;
      setBody(planet.id, Math.cos(angle) * planet.orbitRadius, 0, Math.sin(angle) * planet.orbitRadius, planet.radius);
    });

    const moonAngle = (orbitTime / MOON_DURATION) * TAU;
    const earthOffset = BODY_IDS.earth * 4;
    setBody(
      BODY_IDS.moon,
      bodies[earthOffset] + Math.cos(moonAngle) * MOON_DISTANCE,
      Math.sin(moonAngle) * MOON_DISTANCE * 0.22,
      bodies[earthOffset + 2] + Math.sin(moonAngle) * MOON_DISTANCE,
      MOON_RADIUS
    );

    const satelliteAngle = (orbitTime / SATELLITE_DURATION) * -TAU;
    const marsOffset = BODY_IDS.mars * 4;
    setBody(
      BODY_IDS.satellite,
      bodies[marsOffset] + Math.cos(satelliteAngle) * SATELLITE_DISTANCE,
      Math.cos(satelliteAngle) * SATELLITE_DISTANCE * 0.35,
      bodies[marsOffset + 2] + Math.sin(satelliteAngle) * SATELLITE_DISTANCE,
      SATELLITE_RADIUS
    );
  };

  const updateCamera = (elevation: number, yaw: number) => {
    const position = [
      Math.sin(yaw) * Math.cos(elevation) * CAMERA_DISTANCE,
      Math.sin(elevation) * CAMERA_DISTANCE,
      Math.cos(yaw) * Math.cos(elevation) * CAMERA_DISTANCE
    ];
    const forward = normalize(position.map((value) => -value));
    const flatRight = normalize(cross(forward, [0, 1, 0]));
    const flatUp = cross(flatRight, forward);

    const roll = Math.cos(CAMERA_ROLL);
    const tilt = Math.sin(CAMERA_ROLL);
    const right = flatRight.map((value, i) => value * roll + flatUp[i] * tilt);
    const up = flatUp.map((value, i) => value * roll - flatRight[i] * tilt);

    gl.uniform3fv(uniforms.camPos, position);
    gl.uniformMatrix3fv(uniforms.cam, false, [...right, ...up, ...forward]);

    // Far-to-near order drives compositing in the shader
    for (let id = 0; id < BODY_COUNT; id++) {
      order[id] = id;
      depths[id] =
        (bodies[id * 4] - position[0]) * forward[0] +
        (bodies[id * 4 + 1] - position[1]) * forward[1] +
        (bodies[id * 4 + 2] - position[2]) * forward[2];
    }
    order.sort((a, b) => depths[b] - depths[a]);
    gl.uniform1iv(uniforms.order, order);
  };

  const draw = () => {
    const progress = reducedMotion.matches ? 1 : Math.min(time / INTRO_DURATION, 1);
    const eased = 1 - Math.pow(1 - progress, 3);

    updateBodies(time - INTRO_ORBIT_SKIP * (1 - eased));

    const elevation = INTRO_ELEVATION + (CAMERA_ELEVATION - INTRO_ELEVATION) * eased;
    updateCamera(elevation + pointerY * 0.09, pointerX * 0.13);

    gl.uniform1f(uniforms.time, time);
    gl.uniform4fv(uniforms.body, bodies);
    gl.uniform1fv(uniforms.angle, angles);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR) * resolutionScale;
    const size = Math.max(1, Math.round(canvas.clientWidth * dpr));
    if (canvas.width !== size || canvas.height !== size) {
      canvas.width = size;
      canvas.height = size;
      gl.viewport(0, 0, size, size);
      gl.uniform2f(uniforms.res, size, size);
    }
    draw();
  };

  const trackPerformance = (delta: number) => {
    slowSum += delta;
    slowSamples++;
    if (slowSamples < 45) return;

    const average = slowSum / slowSamples;
    if (average > SLOW_FRAME_MS && resolutionScale > MIN_RESOLUTION_SCALE) {
      resolutionScale = Math.max(resolutionScale * 0.8, MIN_RESOLUTION_SCALE);
      resize();
    } else if (average > TOO_SLOW_FRAME_MS) {
      // Still struggling at the lowest resolution: settle for a still frame
      isTooSlow = true;
      syncLoop();
    }
    slowSum = 0;
    slowSamples = 0;
  };

  const frame = (now: number) => {
    frameId = requestAnimationFrame(frame);
    const delta = now - lastFrame;
    lastFrame = now;

    time += Math.min(delta, 100) / 1000;
    pointerX += (targetX - pointerX) * 0.05;
    pointerY += (targetY - pointerY) * 0.05;

    trackPerformance(delta);
    draw();
  };

  const stop = () => {
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
  };

  // Only burn GPU time while the hero can actually be seen
  const syncLoop = () => {
    const shouldRun = isVisible && !document.hidden && !reducedMotion.matches && !isTooSlow;
    if (shouldRun && frameId === null) {
      lastFrame = performance.now();
      frameId = requestAnimationFrame(frame);
    } else if (!shouldRun) {
      stop();
      draw();
    }
  };

  const handlePointer = (event: PointerEvent) => {
    targetX = (event.clientX / window.innerWidth) * 2 - 1;
    targetY = (event.clientY / window.innerHeight) * 2 - 1;
  };

  const handleContextLost = (event: Event) => {
    event.preventDefault();
    stop();
    isReady.value = false;
  };

  const resizeObserver = new ResizeObserver(resize);
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    syncLoop();
  });

  resizeObserver.observe(canvas);
  visibilityObserver.observe(canvas);
  document.addEventListener('visibilitychange', syncLoop);
  reducedMotion.addEventListener('change', syncLoop);
  window.addEventListener('pointermove', handlePointer, { passive: true });
  canvas.addEventListener('webglcontextlost', handleContextLost);

  resize();
  syncLoop();
  isReady.value = true;

  return () => {
    stop();
    resizeObserver.disconnect();
    visibilityObserver.disconnect();
    document.removeEventListener('visibilitychange', syncLoop);
    reducedMotion.removeEventListener('change', syncLoop);
    window.removeEventListener('pointermove', handlePointer);
    canvas.removeEventListener('webglcontextlost', handleContextLost);
  };
};

let cleanupScene: (() => void) | undefined;

onMounted(() => {
  if (canvasRef.value) {
    cleanupScene = initScene(canvasRef.value);
  }
});

onUnmounted(() => {
  if (cleanupScene) {
    cleanupScene();
  }
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

  &.is-ready {
    .solar-system-canvas {
      opacity: 1;
    }

    .solar-loader {
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.6s ease, visibility 0s linear 0.6s;
    }
  }
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

.solar-system-canvas,
.solar-loader {
  position: absolute;
  inset: -12%;
  width: 124%;
  height: 124%;
  transition: opacity 0.6s ease;
  pointer-events: none;
  z-index: 1;

  // Stacked layout has no free space around it, bleeding would cause page scroll
  @media (max-width: 900px) {
    inset: 0;
    width: 100%;
    height: 100%;
  }
}

.solar-system-canvas {
  opacity: 0;
}

// The rotating layers' corners would otherwise count as scrollable overflow
.solar-loader {
  overflow: hidden;
}

// Only rotate and opacity animate: they stay smooth even if the shader build blocks the main thread
.loader-plane,
.loader-orbit {
  position: absolute;
  inset: 0;
}

.loader-orbit {
  rotate: var(--start);
  animation: loader-orbit var(--period) linear infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: var(--orbit);
    aspect-ratio: 1;
    border-radius: 50%;
    translate: -50% -50%;
  }

  &::before {
    border: 1px solid rgba(255, 255, 255, 0.11);
  }

  // Fading trail behind the planet, which sits at 90deg in this conic gradient
  &::after {
    background: conic-gradient(from 90deg, transparent 62%, var(--color) 100%);
    mask: radial-gradient(closest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1px));
  }
}

.loader-planet {
  position: absolute;
  top: 50%;
  left: calc(50% + var(--orbit) / 2);
  width: var(--planet);
  aspect-ratio: 1;
  border-radius: 50%;
  translate: -50% -50%;
  rotate: calc(var(--start) * -1);
  scale: 1 calc(1 / var(--squash));
  background: radial-gradient(circle at 32% 32%, #FFFFFF -30%, var(--color) 45%, #0B0B12 125%);
  box-shadow: 0 0 10px var(--color);
  animation: loader-counter var(--period) linear infinite;
}

.loader-sun,
.loader-halo {
  position: absolute;
  top: 50%;
  left: 50%;
  aspect-ratio: 1;
  border-radius: 50%;
  translate: -50% -50%;
}

.loader-sun {
  width: var(--sun);
  background: radial-gradient(circle, #FFF0D6 0%, #FFB27A 28%, #FF8E40 48%, #FF3B5C 76%, #A30A32 100%);
  box-shadow: 0 0 22px rgba(255, 142, 64, 0.65), 0 0 56px rgba(255, 59, 92, 0.45);
}

.loader-halo {
  width: calc(var(--sun) * 2.1);
  background: radial-gradient(circle, rgba(255, 142, 64, 0.5) 30%, rgba(255, 59, 92, 0.22) 50%, rgba(255, 59, 92, 0) 70%);
  animation: loader-breathe 3.2s ease-in-out infinite alternate;
}

@keyframes loader-orbit {
  to {
    rotate: calc(var(--start) + 360deg);
  }
}

@keyframes loader-counter {
  to {
    rotate: calc(var(--start) * -1 - 360deg);
  }
}

@keyframes loader-breathe {
  from {
    opacity: 0.55;
  }

  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .loader-orbit,
  .loader-planet,
  .loader-halo {
    animation: none;
  }
}
</style>
