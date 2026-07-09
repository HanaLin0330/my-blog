<script setup>
import { siteConfig } from '../config/site.js'
</script>

<template>
  <div class="friends-page">
    <h1 class="page-title">友情链接</h1>
    <div class="friends-grid">
      <a
        v-for="friend in siteConfig.friends"
        :key="friend.name"
        :href="friend.url"
        target="_blank"
        rel="noopener"
        class="friend-card"
      >
        <h3>{{ friend.name }}</h3>
        <p>{{ friend.desc }}</p>
        <span class="visit-link">访问 →</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.friends-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 24px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 32px;
  animation: float-in 620ms var(--ease-out) both;
}

.friends-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 22px;
}

.friend-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  padding: 28px;
  text-decoration: none;
  color: var(--text);
  animation: float-in 680ms var(--ease-out) both;
  transition:
    background var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out),
    transform var(--motion-base) var(--ease-out);
  display: block;
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(16px) saturate(1.12);
  -webkit-backdrop-filter: blur(16px) saturate(1.12);
}

.friend-card:hover {
  transform: translateY(-3px);
  background: var(--glass-bg-strong);
  border-color: rgba(215, 189, 146, 0.5);
}

.friend-card:nth-child(2) { animation-delay: 80ms; }
.friend-card:nth-child(3) { animation-delay: 160ms; }

.friend-card h3 {
  margin: 0 0 8px;
  font-size: 18px;
  color: var(--text-strong);
}

.friend-card p {
  margin: 0 0 12px;
  font-size: 14px;
  color: var(--muted);
  line-height: 1.5;
}

.visit-link {
  font-size: 13px;
  color: var(--accent-strong);
  font-weight: 600;
}

@media (max-width: 640px) {
  .friends-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .friend-card {
    padding: 20px;
  }

  .friend-card:hover {
    transform: translateY(-3px);
  }
}
</style>
