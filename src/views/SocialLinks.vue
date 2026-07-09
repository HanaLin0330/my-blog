<script setup>
import { siteConfig } from '../config/site.js'
import { Code, MessageCircle, Mail, MonitorPlay, Link2 } from '@lucide/vue'

// lucide 移除了品牌图标，使用最接近的通用图标
const iconMap = {
  github: Code,
  twitter: MessageCircle,
  email: Mail,
  bilibili: MonitorPlay,
  link: Link2,
}

function getIconComponent(iconName) {
  return iconMap[iconName] || Link2
}
</script>

<template>
  <div class="social-page">
    <h1 class="page-title">社交媒体</h1>
    <div class="social-list">
      <a
        v-for="link in siteConfig.socialLinks"
        :key="link.name"
        :href="link.url"
        target="_blank"
        rel="noopener"
        class="social-card"
      >
        <span class="social-icon">
          <component
            :is="getIconComponent(link.icon)"
            :size="22"
            :stroke-width="1.8"
          />
        </span>
        <span class="social-name">{{ link.name }}</span>
        <span class="social-arrow">→</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.social-page {
  max-width: 600px;
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

.social-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.social-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  padding: 22px 26px;
  text-decoration: none;
  color: var(--text);
  animation: float-in 680ms var(--ease-out) both;
  transition:
    background var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out),
    transform var(--motion-base) var(--ease-out);
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(16px) saturate(1.12);
  -webkit-backdrop-filter: blur(16px) saturate(1.12);
}

.social-card:hover {
  transform: translateX(4px);
  background: var(--glass-bg-strong);
  border-color: rgba(215, 189, 146, 0.5);
}

.social-card:nth-child(2) { animation-delay: 70ms; }
.social-card:nth-child(3) { animation-delay: 140ms; }
.social-card:nth-child(4) { animation-delay: 210ms; }

.social-icon {
  width: 50px;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: var(--accent-soft);
  color: var(--accent-strong);
  transition: transform var(--motion-fast) var(--ease-out);
}

.social-card:hover .social-icon {
  transform: scale(1.06);
}

.social-name {
  flex: 1;
  font-size: 18px;
  font-weight: 600;
}

.social-arrow {
  color: var(--accent-strong);
  font-size: 18px;
  font-weight: 600;
}

@media (max-width: 640px) {
  .social-list {
    gap: 12px;
  }

  .social-card {
    gap: 12px;
    padding: 16px;
  }

  .social-card:hover {
    transform: translateX(3px);
  }

  .social-icon {
    width: 42px;
    height: 42px;
  }

  .social-name {
    min-width: 0;
    overflow-wrap: anywhere;
    font-size: 16px;
  }

  .social-arrow {
    font-size: 16px;
  }
}
</style>
