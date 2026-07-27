<template>
  <nav
    v-if="items && items.length > 0"
    class="toc-wrapper"
    :class="{ 'is-collapsed': isCollapsed }"
    aria-label="On this page navigation"
  >
    <div class="toc-container glass-card">
      <!-- Header / Toggle -->
      <div class="toc-header" @click="toggleCollapse">
        <div class="toc-title-group">
          <Icon icon="ph:list-bullets-bold" class="toc-icon" :style="{ color: resolvedAccentColor }" />
          <span v-if="!isCollapsed" class="toc-title">{{ computedTitle }}</span>
        </div>
        <button
          class="toggle-btn"
          :aria-label="isCollapsed ? 'Expand section index' : 'Collapse section index'"
          :title="isCollapsed ? 'Expand' : 'Collapse'"
        >
          <Icon :icon="isCollapsed ? 'ph:caret-left-bold' : 'ph:caret-right-bold'" />
        </button>
      </div>

      <!-- TOC Item List -->
      <transition name="toc-expand">
        <ul v-show="!isCollapsed" class="toc-list">
          <li
            v-for="item in items"
            :key="item.id"
            class="toc-item"
            :class="{ active: activeId === item.id }"
          >
            <button
              class="toc-link"
              @click="scrollTo(item.id)"
              :title="item.label"
            >
              <span
                class="indicator-dot"
                :style="activeId === item.id ? { backgroundColor: resolvedAccentColor, boxShadow: `0 0 8px ${resolvedAccentColor}` } : {}"
              ></span>
              <Icon v-if="item.icon" :icon="item.icon" class="item-icon" />
              <span class="item-label">{{ item.label }}</span>
            </button>
          </li>
        </ul>
      </transition>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useLanguage } from '~/composables/useLanguage';

export interface TocItem {
  id: string;
  label: string;
  icon?: string;
}

const props = withDefaults(
  defineProps<{
    items: TocItem[];
    title?: string;
    accentColor?: string;
  }>(),
  {
    title: undefined,
    accentColor: '#FF3B5C'
  }
);

const { currentLang } = useLanguage();
const isCollapsed = ref(false);
const activeId = ref<string>('');

const STORAGE_KEY = 'toc_mobile_collapsed';

const computedTitle = computed(() => {
  if (props.title) return props.title;
  return currentLang.value === 'fr' ? 'Sur cette page' : 'On this page';
});

const resolvedAccentColor = computed(() => {
  const colorMap: Record<string, string> = {
    crimson: '#FF3B5C',
    gold: '#FFD700',
    orange: '#FF7F50',
    'light-blue': '#38BDF8',
    purple: '#A855F7',
    neutral: '#757678'
  };
  return colorMap[props.accentColor] || props.accentColor || '#FF3B5C';
});

const checkIsMobile = () => {
  if (!import.meta.client) return false;
  return window.innerWidth <= 1200;
};

const applyCollapsedState = () => {
  if (!import.meta.client) return;
  if (checkIsMobile()) {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      isCollapsed.value = saved === 'true';
    }
  } else {
    isCollapsed.value = false;
  }
};

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  if (checkIsMobile() && import.meta.client) {
    try {
      localStorage.setItem(STORAGE_KEY, String(isCollapsed.value));
    } catch {
      // ignore storage errors
    }
  }
};

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    const yOffset = -95;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    activeId.value = id;
  }
};

let observer: IntersectionObserver | null = null;
let wasMobile = false;

const handleResize = () => {
  const mobileNow = checkIsMobile();
  if (mobileNow !== wasMobile) {
    wasMobile = mobileNow;
    applyCollapsedState();
  }
};

const setupObserver = () => {
  if (observer) {
    observer.disconnect();
  }

  if (!import.meta.client || props.items.length === 0) return;

  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeId.value = entry.target.id;
      }
    });
  }, observerOptions);

  props.items.forEach((item) => {
    const el = document.getElementById(item.id);
    if (el) {
      observer?.observe(el);
    }
  });
};

onMounted(() => {
  if (import.meta.client) {
    wasMobile = checkIsMobile();
    applyCollapsedState();
    window.addEventListener('resize', handleResize);
  }
  setTimeout(() => {
    setupObserver();
    if (props.items.length > 0 && !activeId.value) {
      activeId.value = props.items[0].id;
    }
  }, 300);
});

watch(() => props.items, () => {
  setTimeout(setupObserver, 200);
}, { deep: true });

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', handleResize);
  }
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.toc-wrapper {
  position: fixed;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 80;
  max-width: 230px;
  transition: all $transition-smooth;

  &.is-collapsed {
    max-width: 52px;
  }

  @media (max-width: 1200px) {
    top: auto;
    bottom: 1.5rem;
    right: 1.25rem;
    transform: none;
    max-width: calc(100vw - 2.5rem);
  }
}

.toc-container {
  padding: 0.75rem 0.9rem;
  background: rgba(14, 14, 18, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: $radius-md;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
  }
}

.toc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  cursor: pointer;
  user-select: none;
  padding: 0.2rem 0.1rem;

  .toc-title-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    overflow: hidden;

    .toc-icon {
      font-size: 1.15rem;
      flex-shrink: 0;
    }

    .toc-title {
      font-size: 0.775rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: $text-muted;
      white-space: nowrap;
    }
  }

  .toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border-radius: $radius-sm;
    color: $text-dark;
    transition: color $transition-fast, background-color $transition-fast;

    &:hover {
      color: #FFF;
      background: rgba(255, 255, 255, 0.1);
    }
  }
}

.toc-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 0.35rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  max-height: 320px;
  overflow-y: auto;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 4px;
  }
}

.toc-item {
  .toc-link {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.35rem 0.5rem;
    border-radius: $radius-sm;
    font-size: 0.825rem;
    color: $text-muted;
    text-align: left;
    transition: all $transition-fast;

    .indicator-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      flex-shrink: 0;
      transition: all $transition-fast;
    }

    .item-icon {
      font-size: 0.95rem;
      flex-shrink: 0;
      opacity: 0.7;
      transition: opacity $transition-fast;
    }

    .item-label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &:hover {
      color: #FFF;
      background: rgba(255, 255, 255, 0.06);

      .indicator-dot {
        background: rgba(255, 255, 255, 0.6);
      }

      .item-icon {
        opacity: 1;
      }
    }
  }

  &.active {
    .toc-link {
      color: #FFF;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.08);

      .item-icon {
        opacity: 1;
      }
    }
  }
}

/* Vue Animations */
.toc-expand-enter-active,
.toc-expand-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.toc-expand-enter-from,
.toc-expand-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
