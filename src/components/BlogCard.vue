<script setup>
import { computed } from 'vue'

const props = defineProps({
  post: { type: Object, required: true },
})

const displayDate = computed(() => {
  const d = props.post.date
  if (!d) return '未知日期'
  try {
    const date = new Date(d)
    return date.toISOString().slice(0, 10)
  } catch {
    return d
  }
})
</script>

<template>
  <RouterLink class="blog-card" :to="`/blog/${post.id}`">
    <h2 class="card-title">{{ post.title || '未命名文章' }}</h2>

    <div class="card-meta">
      <span class="card-date">{{ displayDate }}</span>
      <span v-if="post.tags && post.tags.length" class="card-tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">#{{ tag }}</span>
      </span>
    </div>

    <p class="card-summary">{{ post.summary || '暂无摘要' }}</p>

    <div class="card-footer">
      <span class="read-more">阅读全文 →</span>
    </div>
  </RouterLink>
</template>

<style scoped>
.blog-card {
  display: block;
  background: var(--glass-bg);
  border-radius: var(--radius);
  padding: 28px;
  margin-bottom: 22px;
  color: var(--text);
  position: relative;
  overflow: hidden;
  text-decoration: none;
  animation: float-in 680ms var(--ease-out) both;
  transition:
    background var(--motion-base) var(--ease-out),
    border-color var(--motion-base) var(--ease-out),
    transform var(--motion-base) var(--ease-out);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(16px) saturate(1.12);
  -webkit-backdrop-filter: blur(16px) saturate(1.12);
}

.blog-card::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 16% 0%, rgba(255, 255, 255, 0.24), transparent 32%),
    linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.12) 46%, transparent 72%);
  opacity: 0;
  transition: opacity var(--motion-base) var(--ease-out);
}

.blog-card:hover {
  transform: translateY(-3px);
  background: var(--glass-bg-strong);
  border-color: rgba(215, 189, 146, 0.5);
}

.blog-card:hover::before {
  opacity: 1;
}

.card-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--text-strong);
  margin: 0 0 12px;
}

.card-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  color: var(--muted);
}

.card-tags {
  display: flex;
  gap: 6px;
}

.tag {
  background: var(--accent-soft);
  color: var(--accent-strong);
  padding: 4px 12px;
  border-radius: var(--radius-sm);
  font-size: 12px;
}

.card-summary {
  color: var(--text);
  line-height: 1.7;
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
}

.read-more {
  color: var(--accent-strong);
  font-weight: 600;
  font-size: 14px;
  transition:
    color var(--motion-fast) var(--ease-out),
    transform var(--motion-fast) var(--ease-out);
}

.blog-card:hover .read-more {
  transform: translateX(4px);
}

@media (max-width: 640px) {
  .blog-card {
    margin-bottom: 16px;
    padding: 20px;
    border-radius: var(--radius);
  }

  .card-title {
    font-size: 19px;
    line-height: 1.35;
  }

  .card-meta {
    gap: 8px;
    font-size: 13px;
  }

  .card-tags {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 2px;
  }

  .tag {
    flex: 0 0 auto;
  }

  .card-summary {
    font-size: 14px;
    line-height: 1.65;
  }
}
</style>
