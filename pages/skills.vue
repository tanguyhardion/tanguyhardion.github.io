<template>
  <div class="page-wrapper skills-page">
    <div class="container">
      <header class="page-header" v-reveal:fade-up>
        <span class="page-tag" style="color: #A855F7; border-color: rgba(168, 85, 247, 0.25);">
          <Icon icon="ph:lightning-bold" class="tag-icon" /> {{ t.nav.skills }}
        </span>
        <h1 class="page-title">{{ t.skills.title }}</h1>
        <p class="page-subtitle">{{ t.skills.subtitle }}</p>
      </header>

      <div class="skills-grid">
        <SkillGrid
          v-for="(cat, idx) in skillCategoriesData"
          :key="cat.id"
          :category="cat"
          v-reveal:scale="(idx % 2) * 120"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useLanguage } from '~/composables/useLanguage';
import { skillCategoriesData } from '~/data/portfolioData';
import SkillGrid from '~/components/SkillGrid.vue';

const { t } = useLanguage();
</script>

<style lang="scss" scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.75rem;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
}
</style>
