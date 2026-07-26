<template>
  <div class="page-wrapper projects-page">
    <div class="container">
      <header class="page-header">
        <span class="page-tag" style="color: #38BDF8; border-color: rgba(56, 189, 248, 0.25);">
          <Icon icon="ph:rocket-launch-bold" class="tag-icon" /> {{ t.nav.projects }}
        </span>
        <h1 class="page-title">{{ t.projects.title }}</h1>
        <p class="page-subtitle">{{ t.projects.subtitle }}</p>
      </header>

      <!-- Context Filter Buttons -->
      <div class="filter-bar">
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'ALL' }"
          @click="activeFilter = 'ALL'"
        >
          {{ t.projects.allContexts }}
        </button>
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'Personal' }"
          @click="activeFilter = 'Personal'"
        >
          Personal
        </button>
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'Work' }"
          @click="activeFilter = 'Work'"
        >
          Work
        </button>
        <button
          class="filter-btn"
          :class="{ active: activeFilter === 'School' }"
          @click="activeFilter = 'School'"
        >
          School
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Icon } from '@iconify/vue';
import { useLanguage } from '~/composables/useLanguage';
import { projectsData } from '~/data/portfolioData';
import type { ProjectContext } from '~/types/portfolio';
import ProjectCard from '~/components/ProjectCard.vue';

const { t } = useLanguage();
const activeFilter = ref<ProjectContext | 'ALL'>('ALL');

const filteredProjects = computed(() => {
  if (activeFilter.value === 'ALL') {
    return projectsData;
  }
  return projectsData.filter(p => p.context === activeFilter.value);
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.filter-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;

  .filter-btn {
    padding: 0.45rem 1rem;
    border-radius: $radius-full;
    font-size: 0.875rem;
    font-weight: 600;
    color: $text-muted;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid $border-subtle;
    transition: all $transition-fast;

    &:hover {
      color: #FFF;
      background: rgba(255, 255, 255, 0.08);
    }

    &.active {
      color: #38BDF8;
      background: rgba(56, 189, 248, 0.12);
      border-color: rgba(56, 189, 248, 0.3);
    }
  }
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.75rem;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
}
</style>
