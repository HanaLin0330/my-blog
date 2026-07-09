<script setup>
import { siteConfig } from '../config/site.js'
</script>

<template>
  <div class="home-hero">
    <h1 class="hero-nickname">{{ siteConfig.nickname }}</h1>
    <p class="hero-bio">{{ siteConfig.bio }}</p>
  </div>
</template>

<style scoped>
.home-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - var(--nav-height));
  text-align: center;
  padding: var(--page-top) var(--page-x) var(--page-bottom);
  color: #fff;
  user-select: none;
}

.hero-nickname {
  font-size: 56px;
  font-weight: 800;
  margin: 0 0 16px;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.22);
  animation: hero-title-in 520ms var(--ease-out) 80ms both;
}

.hero-bio {
  font-size: 20px;
  margin: 0;
  opacity: 0.94;
  max-width: 500px;
  line-height: 1.6;
  animation: hero-copy-in 520ms var(--ease-out) 150ms both;
}

@media (max-width: 640px) {
  .home-hero {
    justify-content: flex-start;
    min-height: calc(100svh - var(--nav-height));
    padding-top: max(96px, 18svh);
  }

  .hero-nickname {
    font-size: clamp(34px, 12vw, 46px);
    line-height: 1.05;
    margin-bottom: 14px;
  }

  .hero-bio {
    width: min(100%, 320px);
    font-size: 16px;
    line-height: 1.7;
  }
}

@keyframes hero-title-in {
  from {
    opacity: 0;
    transform: translate3d(0, 10px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes hero-copy-in {
  from {
    opacity: 0;
    transform: translate3d(0, 8px, 0);
  }
  to {
    opacity: 0.94;
    transform: translate3d(0, 0, 0);
  }
}
</style>
