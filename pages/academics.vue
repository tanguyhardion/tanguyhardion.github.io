<template>
  <div class="page-wrapper academics-page">
    <div class="container">
      <header class="page-header" v-reveal:fade-up>
        <span class="page-tag" style="color: #FFD700; border-color: rgba(255, 215, 0, 0.25);">
          <Icon icon="ph:student-bold" class="tag-icon" /> {{ t.nav.academics }}
        </span>
        <h1 class="page-title">{{ t.academics.title }}</h1>
        <p class="page-subtitle">{{ t.academics.subtitle }}</p>
      </header>

      <div class="timeline-container">
        <TimelineItem
          v-for="(item, idx) in academicsData"
          :key="item.id"
          :title="item.degree[currentLang]"
          :subtitle="item.institution[currentLang]"
          :location="item.location[currentLang]"
          :period="item.period"
          :gpa="item.gpa"
          :gpa-label="t.academics.gpaLabel"
          :description="item.fieldOfStudy[currentLang]"
          :section-title="t.academics.courseworkLabel"
          :bullets="item.courses[currentLang]"
          accent-color="gold"
          v-reveal:slide-right="idx * 100"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useLanguage } from '~/composables/useLanguage';
import { academicsData } from '~/data/portfolioData';
import TimelineItem from '~/components/TimelineItem.vue';

const { currentLang, t } = useLanguage();
</script>

<style lang="scss" scoped>
.academics-page {
  .timeline-container {
    max-width: 860px;
  }
}
</style>
