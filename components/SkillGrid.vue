<template>
  <div :id="id" class="skill-category-card glass-card">
    <div class="category-header">
      <div class="icon-avatar">
        <Icon :icon="category.icon" width="22" height="22" />
      </div>
      <h3 class="category-name">{{ category.name[currentLang] }}</h3>
    </div>

    <div class="skills-grid-container">
      <div 
        v-for="skill in category.skills" 
        :key="skill.name" 
        class="skill-chip"
      >
        <div class="skill-icon-wrapper">
          <Icon :icon="skill.icon || 'ph:check-circle-bold'" width="16" height="16" />
        </div>
        <span class="skill-name">{{ skill.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { SkillCategory } from '~/types/portfolio';
import { useLanguage } from '~/composables/useLanguage';

defineProps<{
  id?: string;
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
  flex-shrink: 0;
}

.category-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: #FFFFFF;
}

.skills-grid-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}

.skill-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.85rem;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;

  .skill-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.7);
    transition: color 0.25s ease, transform 0.25s ease;
  }

  .skill-name {
    font-size: 0.88rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.88);
    transition: color 0.25s ease;
  }

  &:hover {
    background: rgba(168, 85, 247, 0.1);
    border-color: rgba(168, 85, 247, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);

    .skill-icon-wrapper {
      color: #C084FC;
      transform: scale(1.15);
    }

    .skill-name {
      color: #FFFFFF;
    }
  }
}
</style>


