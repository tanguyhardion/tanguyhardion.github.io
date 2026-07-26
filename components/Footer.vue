<template>
  <footer class="app-footer">
    <div class="container footer-content">
      <div class="brand-section">
        <span class="footer-title">Tanguy Hardion</span>
        <p class="footer-subtitle">{{ t.footer.builtWith }}</p>
      </div>

      <div class="footer-links">
        <a href="mailto:tanguy.hardion.pro@gmail.com" class="footer-email">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          tanguy.hardion.pro@gmail.com
        </a>

        <div class="social-group">
          <a href="https://github.com/tanguyhardion" target="_blank" rel="noopener noreferrer" class="social-link">GitHub</a>
          <a href="https://linkedin.com/in/tanguyhardion" target="_blank" rel="noopener noreferrer" class="social-link">LinkedIn</a>
        </div>
      </div>
    </div>
    <div class="container footer-bottom">
      <p>© {{ new Date().getFullYear() }} Tanguy Hardion. {{ t.footer.rights }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useLanguage } from '~/composables/useLanguage';
const { t } = useLanguage();
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.app-footer {
  border-top: 1px solid $border-subtle;
  background: rgba(0, 0, 0, 0.8);
  padding: 4rem 0 2rem;
  margin-top: 4rem;
  position: relative;
  z-index: 10;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.brand-section {
  .footer-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: #FFF;
    display: block;
    margin-bottom: 0.35rem;
  }
  .footer-subtitle {
    font-size: 0.875rem;
    color: $text-muted;
  }
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;

  .footer-email {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: $text-main;
    padding: 0.5rem 1rem;
    border-radius: $radius-full;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid $border-subtle;
    transition: all $transition-fast;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
    }
  }

  .social-group {
    display: flex;
    gap: 1.25rem;

    .social-link {
      font-size: 0.9rem;
      color: $text-muted;
      transition: color $transition-fast;

      &:hover {
        color: #FFF;
      }
    }
  }
}

.footer-bottom {
  padding-top: 1.5rem;
  font-size: 0.8rem;
  color: $text-dark;
  text-align: center;
}
</style>
