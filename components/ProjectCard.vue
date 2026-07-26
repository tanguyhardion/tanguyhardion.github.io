<template>
  <div :id="id" class="project-card glass-card">
    <div class="card-header">
      <span class="context-pill" :class="project.context.toLowerCase()">
        {{ project.contextLabel[currentLang] }}
      </span>
      <div class="meta-stats">
        <span class="stat-item" title="Team size">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          {{ project.teamSize }} {{ project.teamSize === 1 ? 'Dev' : 'Devs' }}
        </span>
        <span class="stat-item" title="Duration">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
          {{ project.duration[currentLang] }}
        </span>
      </div>
    </div>

    <h3 class="project-title">{{ project.title }}</h3>
    <p class="project-description">{{ project.shortDescription[currentLang] }}</p>

    <!-- Tag list -->
    <div class="tag-list">
      <span v-for="tag in project.tags" :key="tag" class="project-tag">
        {{ tag }}
      </span>
    </div>

    <!-- Actions / Links -->
    <div class="card-actions">
      <a
        v-if="project.repoUrl"
        :href="project.repoUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="action-btn outline"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
        {{ t.projects.viewRepo }}
      </a>
      <a
        v-if="project.demoUrl"
        :href="project.demoUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="action-btn primary"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
        {{ t.projects.liveDemo }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectItem } from '~/types/portfolio';
import { useLanguage } from '~/composables/useLanguage';

defineProps<{
  id?: string;
  project: ProjectItem;
}>();

const { currentLang, t } = useLanguage();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.project-card {
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    border-color: rgba(56, 189, 248, 0.4);
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
}

.context-pill {
  padding: 0.25rem 0.65rem;
  border-radius: $radius-full;
  font-size: 0.75rem;
  font-weight: 600;
  color: $text-muted;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid $border-subtle;
}

.meta-stats {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.775rem;
  color: $text-dark;

  .stat-item {
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
}

.project-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #FFF;
  margin-bottom: 0.6rem;
}

.project-description {
  font-size: 0.925rem;
  color: $text-muted;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-bottom: 1.5rem;

  .project-tag {
    padding: 0.2rem 0.6rem;
    border-radius: $radius-sm;
    font-size: 0.75rem;
    font-family: $font-mono;
    background: rgba(255, 255, 255, 0.05);
    color: #D1D5DB;
    border: 1px solid $border-subtle;
  }
}

.card-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.45rem 0.9rem;
    border-radius: $radius-sm;
    font-size: 0.825rem;
    font-weight: 600;
    transition: all $transition-fast;

    &.outline {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid $border-subtle;
      color: $text-main;

      &:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.25);
      }
    }

    &.primary {
      background: rgba(56, 189, 248, 0.15);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: #38BDF8;

      &:hover {
        background: rgba(56, 189, 248, 0.25);
        border-color: rgba(56, 189, 248, 0.5);
      }
    }
  }
}
</style>
