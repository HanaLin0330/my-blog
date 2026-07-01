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
  padding: 40px 24px;
  color: #fff;
  user-select: none;
}

.hero-nickname {
  font-size: 56px;
  font-weight: 800;
  margin: 0 0 16px;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.22);
  animation: hero-title-in 900ms var(--ease-out) 120ms both;
}

.hero-bio {
  font-size: 20px;
  margin: 0;
  opacity: 0.94;
  max-width: 500px;
  line-height: 1.6;
  animation: hero-copy-in 900ms var(--ease-out) 260ms both;
}

@media (max-width: 640px) {
  .hero-nickname {
    font-size: 36px;
  }
  .hero-bio {
    font-size: 16px;
  }
}

@keyframes hero-title-in {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.98);
    filter: blur(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes hero-copy-in {
  from {
    opacity: 0;
    transform: translateY(12px);
    filter: blur(8px);
  }
  to {
    opacity: 0.94;
    transform: translateY(0);
    filter: blur(0);
  }
}
</style>
