<template>
  <div class="page-wrapper experience-page">
    <TableOfContents :items="tocItems" accent-color="orange" />

    <div class="container">
      <header class="page-header" v-reveal:fade-up>
        <span class="page-tag" style="color: #FF7F50; border-color: rgba(255, 127, 80, 0.25);">
          <Icon icon="ph:briefcase-bold" class="tag-icon" /> {{ t.nav.experience }}
        </span>
        <h1 class="page-title">{{ t.experience.title }}</h1>
        <p class="page-subtitle">{{ t.experience.subtitle }}</p>
      </header>

      <div class="timeline-container">
        <TimelineItem
          v-for="(item, idx) in experienceData"
          :key="item.id"
          :id="'exp-' + item.id"
          :title="item.role[currentLang]"
          :subtitle="item.company[currentLang]"
          :location="item.location[currentLang]"
          :period="item.period"
          :contract-type="item.contractType[currentLang]"
          :description="item.description[currentLang]"
          :section-title="t.experience.keyAchievements"
          :bullets="item.achievements[currentLang]"
          :techs="item.technologies"
          accent-color="orange"
          v-reveal:slide-right="idx * 100"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { useLanguage } from '~/composables/useLanguage';
import { experienceData } from '~/data/portfolioData';
import TimelineItem from '~/components/TimelineItem.vue';
import TableOfContents, { type TocItem } from '~/components/TableOfContents.vue';

const { currentLang, t } = useLanguage();

const tocItems = computed<TocItem[]>(() =>
  experienceData.map(item => ({
    id: `exp-${item.id}`,
    label: item.company[currentLang.value],
    icon: 'ph:briefcase-bold'
  }))
);
</script>

<style lang="scss" scoped>
.experience-page {
  .timeline-container {
    max-width: 860px;
  }
}
</style>
