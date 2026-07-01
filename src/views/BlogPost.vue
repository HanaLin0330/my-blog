<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchPost } from '../utils/api.js'
import { renderMarkdown } from '../utils/markdown.js'

const route = useRoute()
const post = ref(null)
const loading = ref(true)
const htmlContent = ref('')

const displayDate = computed(() => {
  const d = post.value?.date
  if (!d) return ''
  try {
    const date = new Date(d)
    return date.toISOString().slice(0, 10)
  } catch {
    return d
  }
})

async function loadPost() {
  loading.value = true
  try {
    const id = route.params.id
    const data = await fetchPost(id)
    post.value = data
    htmlContent.value = renderMarkdown(data.content || '')
  } catch (e) {
    console.error('加载文章失败:', e)
  } finally {
    loading.value = false
  }
}

onMounted(loadPost)
</script>

<template>
  <div class="post-page">
    <div class="post-container">
      <div v-if="loading" class="post-loading">文章加载中...</div>
      <template v-else>
        <template v-if="post">
          <article>
            <header class="post-header">
              <h1 class="post-title">{{ post.title }}</h1>
              <div class="post-meta">
                <span>{{ displayDate }}</span>
                <span v-if="post.tags && post.tags.length">
                  <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
                </span>
              </div>
            </header>

            <div class="post-body markdown-body" v-html="htmlContent"></div>
          </article>
        </template>
        <div v-else class="not-found">
          <p>文章未找到</p>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.post-page {
  min-height: 100vh;
  padding: 40px 24px 80px;
}

.post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: var(--paper-bg);
  border: 1px solid var(--paper-border);
  border-radius: 8px;
  box-shadow: 0 30px 90px rgba(22, 16, 10, 0.22);
  animation: soft-pop 620ms var(--ease-out) 80ms both;
}

.post-header {
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--paper-border);
}

.post-title {
  font-size: 36px;
  font-weight: 800;
  color: var(--text-strong);
  margin: 0 0 16px;
  line-height: 1.3;
}

.post-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 15px;
  color: var(--muted);
}

.tag {
  background: var(--accent-soft);
  color: var(--accent-strong);
  padding: 2px 10px;
  border-radius: 8px;
  font-size: 12px;
  margin-left: 6px;
}

/* Markdown 渲染样式 */
.post-body {
  font-size: 16px;
  line-height: 1.85;
  color: var(--text);
}

.post-body :deep(h1) { font-size: 28px; margin: 32px 0 16px; font-weight: 700; }
.post-body :deep(h2) { font-size: 24px; margin: 28px 0 14px; font-weight: 700; border-bottom: 1px solid var(--paper-border); padding-bottom: 8px; }
.post-body :deep(h3) { font-size: 20px; margin: 24px 0 12px; font-weight: 600; }
.post-body :deep(h4) { font-size: 18px; margin: 20px 0 10px; font-weight: 600; }
.post-body :deep(p) { margin: 0 0 16px; }
.post-body :deep(ul), .post-body :deep(ol) { padding-left: 24px; margin: 0 0 16px; }
.post-body :deep(li) { margin-bottom: 6px; }
.post-body :deep(blockquote) {
  border-left: 4px solid var(--accent);
  padding: 12px 20px;
  margin: 0 0 16px;
  background: var(--accent-soft);
  color: var(--text);
  border-radius: 0 8px 8px 0;
}
.post-body :deep(code) {
  background: var(--code-bg);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: 'Fira Code', 'Consolas', monospace;
}
.post-body :deep(pre) {
  background: #1e1e1e;
  border-radius: 10px;
  padding: 20px;
  overflow-x: auto;
  margin: 0 0 16px;
}
.post-body :deep(pre code) {
  background: none;
  padding: 0;
  color: #d4d4d4;
  font-size: 14px;
  line-height: 1.6;
}
.post-body :deep(a) {
  color: var(--accent-strong);
  text-decoration: none;
}
.post-body :deep(a:hover) {
  text-decoration: underline;
}
.post-body :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 16px 0;
}
.post-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 16px 0;
}
.post-body :deep(th), .post-body :deep(td) {
  border: 1px solid var(--paper-border);
  padding: 10px 14px;
  text-align: left;
}
.post-body :deep(th) {
  background: var(--accent-soft);
  font-weight: 600;
}
.post-body :deep(hr) {
  border: none;
  border-top: 1px solid var(--paper-border);
  margin: 32px 0;
}

.post-loading,
.not-found {
  text-align: center;
  padding: 80px 0;
  color: var(--muted);
  font-size: 18px;
}

@media (max-width: 640px) {
  .post-page { padding: 24px 16px 56px; }
  .post-container { padding: 28px 20px; }
  .post-title { font-size: 26px; }
  .post-body { font-size: 15px; }
}
</style>
