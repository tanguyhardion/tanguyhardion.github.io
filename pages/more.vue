<template>
  <div class="page-wrapper more-page">
    <div class="container">
      <header class="page-header" v-reveal:fade-up>
        <span class="page-tag" style="color: #757678; border-color: rgba(117, 118, 120, 0.3);">
          <Icon icon="ph:folder-user-bold" class="tag-icon" /> {{ t.nav.more }}
        </span>
        <h1 class="page-title">{{ t.more.title }}</h1>
        <p class="page-subtitle">{{ t.more.subtitle }}</p>
      </header>

      <!-- Section 1: Resume Downloads with Live GitHub Commit Dates -->
      <section class="more-section" v-reveal:fade-up>
        <div class="section-heading">
          <h2 class="section-title">{{ t.more.resumesTitle }}</h2>
          <p class="section-desc">{{ t.more.resumesSubtitle }}</p>
        </div>

        <div class="resumes-grid">
          <div
            v-for="(resume, idx) in resumeFormatsData"
            :key="resume.id"
            class="resume-card glass-card"
            v-reveal:scale="idx * 100"
          >
            <div class="resume-header">
              <span class="format-badge">{{ resume.format }}</span>
              <span class="file-size">{{ resume.fileSize }}</span>
            </div>

            <h3 class="resume-title">{{ resume.title[currentLang] }}</h3>

            <div class="resume-date-meta">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>{{ t.more.lastUpdated }}: <strong>{{ dates[resume.filePathInRepo] || 'July 2026' }}</strong></span>
            </div>

            <a
              :href="resume.downloadUrl"
              download
              class="download-btn"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {{ t.more.download }}
            </a>
          </div>
        </div>
      </section>

      <!-- Section 2: Spoken Languages -->
      <section class="more-section" v-reveal:fade-up>
        <div class="section-heading">
          <h2 class="section-title">{{ t.more.languagesTitle }}</h2>
          <p class="section-desc">{{ t.more.languagesSubtitle }}</p>
        </div>

        <div class="languages-grid">
          <div
            v-for="(langItem, idx) in languagesData"
            :key="langItem.flagIcon"
            class="language-card glass-card"
            v-reveal:slide-right="idx * 120"
          >
            <div class="lang-card-header">
              <span class="flag-icon-wrap"><Icon :icon="langItem.flagIcon" class="flag-icon" /></span>
              <div>
                <h3 class="lang-name">{{ langItem.name[currentLang] }}</h3>
                <span class="lang-level">{{ langItem.level }}</span>
              </div>
            </div>
            <p class="lang-desc">{{ langItem.description[currentLang] }}</p>
          </div>
        </div>
      </section>

      <!-- Section 3: Personal Interests -->
      <section class="more-section" v-reveal:fade-up>
        <div class="section-heading">
          <h2 class="section-title">{{ t.more.interestsTitle }}</h2>
          <p class="section-desc">{{ t.more.interestsSubtitle }}</p>
        </div>

        <div class="interests-grid">
          <div
            v-for="(interest, idx) in personalInterestsData"
            :key="interest.icon"
            class="interest-card glass-card"
            v-reveal:scale="idx * 100"
          >
            <span class="interest-icon-wrap"><Icon :icon="interest.icon" class="interest-icon" /></span>
            <h3 class="interest-title">{{ interest.title[currentLang] }}</h3>
            <p class="interest-desc">{{ interest.description[currentLang] }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { useLanguage } from '~/composables/useLanguage';
import { useResumeDate } from '~/composables/useResumeDate';
import { resumeFormatsData, languagesData, personalInterestsData } from '~/data/portfolioData';

const { currentLang, t } = useLanguage();
const { dates, fetchResumeDate } = useResumeDate();

onMounted(() => {
  resumeFormatsData.forEach(r => {
    fetchResumeDate(r.filePathInRepo);
  });
});
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.more-section {
  margin-bottom: 4.5rem;
}

.section-heading {
  margin-bottom: 2rem;

  .section-title {
    font-size: 1.6rem;
    font-weight: 800;
    color: #FFF;
    margin-bottom: 0.35rem;
  }

  .section-desc {
    font-size: 0.95rem;
    color: $text-muted;
  }
}

/* Resumes Grid */
.resumes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .resume-card {
    display: flex;
    flex-direction: column;

    &:hover {
      border-color: rgba(255, 255, 255, 0.3);
    }
  }

  .resume-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    .format-badge {
      padding: 0.2rem 0.5rem;
      border-radius: $radius-sm;
      font-size: 0.75rem;
      font-weight: 700;
      background: rgba(255, 255, 255, 0.1);
      color: #FFF;
    }

    .file-size {
      font-size: 0.775rem;
      color: $text-dark;
      font-family: $font-mono;
    }
  }

  .resume-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #FFF;
    margin-bottom: 1rem;
    flex-grow: 1;
  }

  .resume-date-meta {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.8rem;
    color: $text-muted;
    margin-bottom: 1.25rem;

    strong {
      color: #FFF;
    }
  }

  .download-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.6rem 1rem;
    border-radius: $radius-sm;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid $border-subtle;
    color: #FFF;
    font-size: 0.875rem;
    font-weight: 600;
    transition: all $transition-fast;

    &:hover {
      background: rgba(255, 255, 255, 0.16);
      border-color: rgba(255, 255, 255, 0.3);
    }
  }
}

/* Languages Grid */
.languages-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .lang-card-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.85rem;

    .flag-icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
    }

    .lang-name {
      font-size: 1.2rem;
      font-weight: 700;
      color: #FFF;
    }

    .lang-level {
      font-size: 0.825rem;
      color: $color-light-blue;
      font-weight: 600;
    }
  }

  .lang-desc {
    font-size: 0.925rem;
    color: $text-muted;
    line-height: 1.6;
  }
}

/* Interests Grid */
.interests-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .interest-icon-wrap {
    font-size: 2rem;
    margin-bottom: 0.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: $color-light-blue;
  }

  .interest-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #FFF;
    margin-bottom: 0.5rem;
  }

  .interest-desc {
    font-size: 0.875rem;
    color: $text-muted;
    line-height: 1.5;
  }
}
</style>
