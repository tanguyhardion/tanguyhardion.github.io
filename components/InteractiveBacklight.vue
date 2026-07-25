<template>
  <div class="interactive-backlight-container" aria-hidden="true">
    <div
      class="mouse-glow"
      :style="glowStyle"
    ></div>
    <div
      class="ambient-center-glow"
      :style="ambientStyle"
    ></div>
    <div class="grid-overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from '#imports';
import { useBacklight } from '~/composables/useBacklight';

const route = useRoute();
const { activeTheme, mousePosition, updateMousePosition, setThemeByRoute } = useBacklight();

watch(
  () => route.path,
  (newPath) => {
    setThemeByRoute(newPath);
  },
  { immediate: true }
);

const handleMouseMove = (e: MouseEvent) => {
  updateMousePosition(e.clientX, e.clientY);
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});

const glowStyle = computed(() => {
  const { x, y } = mousePosition.value;
  const rgb = activeTheme.value.glowRgb;
  return {
    transform: `translate3d(${x - 300}px, ${y - 300}px, 0)`,
    background: `radial-gradient(circle, rgba(${rgb}, 0.28) 0%, rgba(${rgb}, 0.08) 45%, rgba(0, 0, 0, 0) 70%)`
  };
});

const ambientStyle = computed(() => {
  const rgb = activeTheme.value.glowRgb;
  return {
    background: `radial-gradient(circle, rgba(${rgb}, 0.12) 0%, rgba(0, 0, 0, 0) 70%)`
  };
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.interactive-backlight-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.mouse-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  transition: transform 0.08s ease-out, background 0.6s ease;
  will-change: transform, background;
  filter: blur(40px);
}

.ambient-center-glow {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  width: 90vw;
  max-width: 1200px;
  height: 600px;
  border-radius: 50%;
  transition: background 0.6s ease;
  filter: blur(90px);
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(circle at 50% 30%, black 0%, transparent 80%);
  -webkit-mask-image: radial-gradient(circle at 50% 30%, black 0%, transparent 80%);
  opacity: 0.6;
}
</style>
