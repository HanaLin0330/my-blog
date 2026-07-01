<script setup>
import { siteConfig } from '../config/site.js'
</script>

<template>
  <div class="about-page">
    <div class="about-card">
      <h1 class="about-title">关于我</h1>
      <div class="about-content">
        <p>来自山东，北京海淀在住，大二在读</p>
        <p>这个站点目前来说是半成品，会接着完善的</p>       
        
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 60px 24px;
}

.about-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  padding: 44px;
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(16px) saturate(1.12);
  -webkit-backdrop-filter: blur(16px) saturate(1.12);
  animation: float-in 720ms var(--ease-out) 120ms both;
}

.about-title {
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 24px;
  color: var(--text-strong);
}

.about-content {
  line-height: 1.85;
  color: var(--text);
  font-size: 16px;
}

.about-content p {
  margin: 0 0 16px;
}

.about-content h3 {
  font-size: 20px;
  margin: 28px 0 12px;
  color: var(--text-strong);
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tech-tag {
  background: var(--accent-soft);
  color: var(--accent-strong);
  padding: 6px 15px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 500;
  transition:
    background var(--motion-fast) var(--ease-out),
    transform var(--motion-fast) var(--ease-out);
}

.tech-tag:hover {
  transform: translateY(-2px);
}
</style>
