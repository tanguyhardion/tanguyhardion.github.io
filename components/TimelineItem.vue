<template>
  <div :id="id" class="timeline-card glass-card" :class="accentColor">
    <div class="timeline-meta">
      <span class="period-pill">{{ formattedPeriod }}</span>
      <span v-if="contractType" class="contract-badge">{{ contractType }}</span>
      <span v-if="gpa" class="gpa-badge">{{ gpaLabel }}: {{ gpa }}</span>
    </div>

    <h3 class="item-title">{{ title }}</h3>
    <h4 class="item-subtitle">
      <a :href="mapsUrl" target="_blank" rel="noopener noreferrer" class="place-link" :title="`View ${subtitle}, ${location} on Google Maps`">
        <Icon icon="ph:map-pin-bold" class="map-icon" />
        <span class="place-name">{{ subtitle }}</span> • <span class="location">{{ location }}</span>
      </a>
    </h4>

    <p v-if="description" class="item-description">{{ description }}</p>

    <!-- Achievements or Coursework list -->
    <div v-if="bullets && bullets.length > 0" class="bullet-section">
      <h5 class="section-label">{{ sectionTitle }}</h5>
      <ul class="bullet-list">
        <li v-for="(item, idx) in bullets" :key="idx">
          <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>{{ item }}</span>
        </li>
      </ul>
    </div>

    <!-- Tech badges -->
    <div v-if="techs && techs.length > 0" class="tech-row">
      <span v-for="t in techs" :key="t" class="tech-tag">{{ t }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { useLanguage } from '~/composables/useLanguage';
import { formatPeriod } from '~/utils/dateUtils';

const props = defineProps<{
  id?: string;
  title: string;
  subtitle: string;
  location: string;
  period: string;
  contractType?: string;
  gpa?: string;
  gpaLabel?: string;
  description?: string;
  sectionTitle?: string;
  bullets?: string[];
  techs?: string[];
  accentColor?: 'crimson' | 'gold' | 'orange' | 'light-blue' | 'purple' | 'neutral';
}>();

const { currentLang } = useLanguage();

const formattedPeriod = computed(() => formatPeriod(props.period, currentLang.value));

const mapsUrl = computed(() => {
  const query = encodeURIComponent(`${props.subtitle}, ${props.location}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.timeline-card {
  margin-bottom: 2rem;

  &.gold {
    &:hover { border-color: rgba(255, 215, 0, 0.4); }
    .period-pill { background: rgba(255, 215, 0, 0.12); color: #FFD700; border-color: rgba(255, 215, 0, 0.25); }
    .place-link:hover {
      color: #FFD700;
      text-decoration-color: #FFD700;
      .map-icon { color: #FFD700; }
      .location { color: #FFE24D; }
    }
  }

  &.orange {
    &:hover { border-color: rgba(255, 127, 80, 0.4); }
    .period-pill { background: rgba(255, 127, 80, 0.12); color: #FF7F50; border-color: rgba(255, 127, 80, 0.25); }
    .place-link:hover {
      color: #FF7F50;
      text-decoration-color: #FF7F50;
      .map-icon { color: #FF7F50; }
      .location { color: #FFA07A; }
    }
  }
}

.timeline-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.period-pill {
  padding: 0.25rem 0.75rem;
  border-radius: $radius-full;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid $border-subtle;
  background: rgba(255, 255, 255, 0.05);
}

.contract-badge, .gpa-badge {
  font-size: 0.8rem;
  color: $text-muted;
  background: rgba(255, 255, 255, 0.04);
  padding: 0.2rem 0.6rem;
  border-radius: $radius-sm;
  border: 1px solid $border-subtle;
}

.item-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 0.35rem;
}

.item-subtitle {
  font-size: 1rem;
  font-weight: 500;
  color: $text-muted;
  margin-bottom: 1rem;

  .place-link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease, text-decoration-color 0.2s ease;

    .map-icon {
      font-size: 1.1rem;
      opacity: 0.7;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    .place-name {
      color: #F3F4F6;
    }

    .location {
      color: $text-dark;
      transition: color 0.2s ease;
    }

    &:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-thickness: 1.5px;

      .map-icon {
        opacity: 1;
        transform: translateY(-1px);
      }
    }
  }
}

.item-description {
  font-size: 0.95rem;
  color: #D1D5DB;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}

.bullet-section {
  margin-top: 1rem;
  margin-bottom: 1.25rem;

  .section-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: $text-muted;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.65rem;
  }

  .bullet-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    li {
      display: flex;
      align-items: flex-start;
      gap: 0.6rem;
      font-size: 0.925rem;
      color: #E5E7EB;

      .check-icon {
        color: $color-gold;
        margin-top: 0.2rem;
        flex-shrink: 0;
      }
    }
  }
}

.tech-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  .tech-tag {
    padding: 0.2rem 0.6rem;
    border-radius: $radius-sm;
    font-size: 0.775rem;
    font-family: $font-mono;
    background: rgba(255, 255, 255, 0.05);
    color: $text-muted;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
}
</style>
