<script setup>
import { ref, onMounted } from 'vue'
import { renderMarkdown } from '../utils/markdown.js'

const htmlContent = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    const aboutModule = await import('../content/about.md?raw')
    htmlContent.value = renderMarkdown(aboutModule.default)
  } catch (e) {
    console.error('加载关于页面失败:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="about-page">
    <div class="about-card">
      <h1 class="about-title">关于我</h1>
      <div v-if="loading" class="about-loading">加载中...</div>
      <div v-else class="about-content markdown-body" v-html="htmlContent"></div>
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

.about-content :deep(p) {
  margin: 0 0 16px;
}

.about-content :deep(h2) {
  font-size: 22px;
  margin: 28px 0 12px;
  color: var(--text-strong);
}

.about-content :deep(a) {
  color: var(--accent-strong);
  text-decoration: none;
}

.about-content :deep(a:hover) {
  text-decoration: underline;
}

.about-content :deep(code) {
  background: var(--code-bg);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: 'Fira Code', 'Consolas', monospace;
}

.about-content :deep(blockquote) {
  border-left: 4px solid var(--accent);
  padding: 12px 20px;
  margin: 0 0 16px;
  background: var(--accent-soft);
  color: var(--text);
  border-radius: 0 8px 8px 0;
}

.about-loading {
  text-align: center;
  color: var(--muted);
  padding: 40px 0;
}

@media (max-width: 640px) {
  .about-card {
    padding: 24px 20px;
  }

  .about-title {
    font-size: 26px;
    line-height: 1.25;
  }

  .about-content {
    font-size: 15px;
    line-height: 1.75;
  }
}
</style>
