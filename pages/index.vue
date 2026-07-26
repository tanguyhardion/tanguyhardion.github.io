<template>
  <div class="page-wrapper home-page">
    <div class="container">
      <div class="hero-grid">
        <!-- Left Hero Column -->
        <div class="hero-content" v-reveal:slide-right>
          <h1 class="hero-greeting">{{ t.home.greeting }}</h1>
          <h2 class="hero-role">{{ t.home.role }}</h2>
          <p class="hero-summary">{{ t.home.summary }}</p>

          <div class="hero-cta-group">
            <NuxtLink to="/projects" class="cta-btn primary">
              <span>{{ t.home.ctaProjects }}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </NuxtLink>
            <NuxtLink to="/more" class="cta-btn secondary">
              <span>{{ t.home.ctaContact }}</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Right Solar System Visual Column -->
        <div class="hero-visual" v-reveal:scale="150">
          <SolarSystemHero />
        </div>
      </div>

      <!-- Quick Stats Section -->
      <div class="stats-grid">
        <div
          v-for="(stat, idx) in t.home.quickStats"
          :key="stat.label"
          class="stat-card glass-card"
          v-reveal:fade-up="idx * 100"
        >
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from '~/composables/useLanguage';
import SolarSystemHero from '~/components/SolarSystemHero.vue';

const { t } = useLanguage();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.home-page {
  display: flex;
  align-items: center;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 4.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}

.hero-content {
  .hero-greeting {
    font-size: clamp(2.5rem, 5vw, 4.2rem);
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.03em;
    margin-bottom: 0.5rem;
    padding-bottom: 0.15em;
    background: linear-gradient(180deg, #FFFFFF 40%, #D1D5DB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .hero-role {
    font-size: clamp(1.25rem, 2.5vw, 1.8rem);
    font-weight: 700;
    color: $color-crimson;
    margin-bottom: 1.25rem;
  }

  .hero-summary {
    font-size: 1.1rem;
    color: $text-muted;
    line-height: 1.75;
    max-width: 580px;
    margin-bottom: 2rem;
  }
}

.hero-cta-group {
  display: flex;
  align-items: center;
  gap: 1rem;

  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.8rem 1.6rem;
    border-radius: $radius-full;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all $transition-fast;

    &.primary {
      background: linear-gradient(135deg, #FF3B5C, #D92343);
      color: #FFFFFF;
      box-shadow: 0 4px 20px rgba(255, 59, 92, 0.4);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 28px rgba(255, 59, 92, 0.6);
      }
    }

    &.secondary {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid $border-subtle;
      color: $text-main;

      &:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.25);
      }
    }
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem 1rem;

    .stat-value {
      font-size: 2.2rem;
      font-weight: 800;
      color: #FFF;
      font-family: $font-mono;
      background: linear-gradient(180deg, #FFFFFF, #FF3B5C);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.85rem;
      color: $text-muted;
      font-weight: 500;
    }
  }
}
</style>
