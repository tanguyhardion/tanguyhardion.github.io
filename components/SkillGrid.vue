<template>
  <div class="skill-category-card glass-card">
    <div class="category-header">
      <div class="icon-avatar">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
      <h3 class="category-name">{{ category.name[currentLang] }}</h3>
    </div>

    <div class="skill-list">
      <div v-for="skill in category.skills" :key="skill.name" class="skill-item">
        <div class="skill-meta">
          <span class="skill-name" :class="{ highlight: skill.highlight }">
            {{ skill.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SkillCategory } from '~/types/portfolio';
import { useLanguage } from '~/composables/useLanguage';

defineProps<{
  category: SkillCategory;
}>();

const { currentLang } = useLanguage();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.skill-category-card {
  &:hover {
    border-color: rgba(168, 85, 247, 0.4);
  }
}

.category-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.icon-avatar {
  width: 40px;
  height: 40px;
  border-radius: $radius-md;
  background: rgba(168, 85, 247, 0.12);
  border: 1px solid rgba(168, 85, 247, 0.25);
  color: #C084FC;
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: #FFFFFF;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skill-item {
  .skill-meta {
    display: flex;
    align-items: center;
    font-size: 0.95rem;

    .skill-name {
      color: $text-muted;
      font-weight: 500;

      &.highlight {
        color: #FFFFFF;
        font-weight: 600;
      }
    }
  }
}
</style>
