<template>
  <header class="app-header">
    <div class="container header-content">
      <!-- Logo / Name -->
      <NuxtLink to="/" class="brand-logo">
        <img src="/images/favicon.svg" alt="Tanguy Hardion Logo" class="logo-avatar-img" />
        <span class="logo-name">Tanguy Hardion</span>
      </NuxtLink>

      <!-- Desktop Navigation Routes -->
      <nav class="desktop-nav">
        <NuxtLink to="/" class="nav-link" active-class="active">
          {{ t.nav.home }}
        </NuxtLink>
        <NuxtLink to="/academics" class="nav-link" active-class="active">
          {{ t.nav.academics }}
        </NuxtLink>
        <NuxtLink to="/experience" class="nav-link" active-class="active">
          {{ t.nav.experience }}
        </NuxtLink>
        <NuxtLink to="/projects" class="nav-link" active-class="active">
          {{ t.nav.projects }}
        </NuxtLink>
        <NuxtLink to="/skills" class="nav-link" active-class="active">
          {{ t.nav.skills }}
        </NuxtLink>
        <NuxtLink to="/more" class="nav-link" active-class="active">
          {{ t.nav.more }}
        </NuxtLink>
      </nav>

      <!-- Header Actions: Language Switcher + Socials -->
      <div class="header-actions">
        <!-- Language Switcher Pill -->
        <button
          class="lang-toggle-btn"
          @click="toggleLanguage"
          :title="currentLang === 'en' ? 'Passer en Français' : 'Switch to English'"
        >
          <Icon :icon="currentLang === 'en' ? 'emojione-v1:flag-for-united-kingdom' : 'emojione-v1:flag-for-france'" class="flag-icon" />
          <span class="lang-code">{{ currentLang.toUpperCase() }}</span>
        </button>

        <!-- Social Icons -->
        <a
          href="mailto:tanguy.hardion.pro@gmail.com"
          class="social-btn"
          title="Email"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        </a>

        <a
          href="https://github.com/tanguyhardion"
          target="_blank"
          rel="noopener noreferrer"
          class="social-btn"
          title="GitHub Profile"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
        </a>

        <a
          href="https://linkedin.com/in/tanguyhardion"
          target="_blank"
          rel="noopener noreferrer"
          class="social-btn"
          title="LinkedIn Profile"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/>
          </svg>
        </a>

        <!-- Mobile Menu Toggle Button -->
        <button class="mobile-toggle-btn" @click="mobileOpen = !mobileOpen" aria-label="Toggle navigation menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="!mobileOpen" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Navigation -->
    <transition name="mobile-slide">
      <div v-if="mobileOpen" class="mobile-dropdown glass-card">
        <NuxtLink to="/" class="mobile-nav-link" @click="mobileOpen = false">
          {{ t.nav.home }}
        </NuxtLink>
        <NuxtLink to="/academics" class="mobile-nav-link" @click="mobileOpen = false">
          {{ t.nav.academics }}
        </NuxtLink>
        <NuxtLink to="/experience" class="mobile-nav-link" @click="mobileOpen = false">
          {{ t.nav.experience }}
        </NuxtLink>
        <NuxtLink to="/projects" class="mobile-nav-link" @click="mobileOpen = false">
          {{ t.nav.projects }}
        </NuxtLink>
        <NuxtLink to="/skills" class="mobile-nav-link" @click="mobileOpen = false">
          {{ t.nav.skills }}
        </NuxtLink>
        <NuxtLink to="/more" class="mobile-nav-link" @click="mobileOpen = false">
          {{ t.nav.more }}
        </NuxtLink>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useLanguage } from '~/composables/useLanguage';

const { currentLang, toggleLanguage, t } = useLanguage();
const mobileOpen = ref(false);
</script>

<style lang="scss" scoped>
@use '~/assets/scss/variables' as *;

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  z-index: 100;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid $border-subtle;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.01em;

  .logo-avatar-img {
    width: 34px;
    height: 34px;
    border-radius: $radius-full;
    object-fit: cover;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .logo-avatar {
    width: 34px;
    height: 34px;
    border-radius: $radius-full;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.03));
    border: 1px solid rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 800;
    color: #FFF;
  }

  .logo-name {
    background: linear-gradient(180deg, #FFFFFF 0%, #D1D5DB 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 860px) {
    display: none;
  }

  .nav-link {
    padding: 0.45rem 0.85rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: $text-muted;
    border-radius: $radius-full;
    transition: color $transition-fast, background $transition-fast;

    &:hover {
      color: $text-main;
      background: rgba(255, 255, 255, 0.05);
    }

    &.active {
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.1);
      font-weight: 600;
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.lang-toggle-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  border-radius: $radius-full;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid $border-subtle;
  color: $text-main;
  font-size: 0.825rem;
  font-weight: 600;
  transition: all $transition-fast;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }

  .flag-icon {
    font-size: 0.95rem;
  }
}

.social-btn {
  width: 36px;
  height: 36px;
  border-radius: $radius-full;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-muted;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid $border-subtle;
  transition: all $transition-fast;

  &:hover {
    color: $text-main;
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
  }
}

.mobile-toggle-btn {
  display: none;
  color: $text-main;

  @media (max-width: 860px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
  }
}

.mobile-dropdown {
  position: absolute;
  top: 80px;
  left: 1.5rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(12, 12, 16, 0.95);
  border: 1px solid $border-light;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.8);

  .mobile-nav-link {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: $text-muted;
    border-radius: $radius-sm;

    &:hover, &.router-link-active {
      color: #FFF;
      background: rgba(255, 255, 255, 0.08);
    }
  }
}

.mobile-slide-enter-active,
.mobile-slide-leave-active {
  transition: all 0.25s ease-out;
}
.mobile-slide-enter-from,
.mobile-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
