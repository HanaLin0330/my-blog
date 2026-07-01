<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
  pageSize: { type: Number, default: 5 },
})

const emit = defineEmits(['change'])

const totalPages = computed(() => Math.ceil(props.total / props.pageSize) || 1)

const pages = computed(() => {
  const result = []
  const max = totalPages.value
  const cur = props.current
  let start = Math.max(1, cur - 2)
  let end = Math.min(max, cur + 2)
  if (end - start < 4) {
    if (start === 1) end = Math.min(max, start + 4)
    else start = Math.max(1, end - 4)
  }
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
})

function goTo(page) {
  if (page >= 1 && page <= totalPages.value && page !== props.current) {
    emit('change', page)
  }
}
</script>

<template>
  <div class="pagination" v-if="totalPages > 1">
    <button class="page-btn" :disabled="current === 1" @click="goTo(current - 1)">上一页</button>
    <button
      v-for="p in pages"
      :key="p"
      class="page-num"
      :class="{ active: p === current }"
      @click="goTo(p)"
    >
      {{ p }}
    </button>
    <button class="page-btn" :disabled="current === totalPages" @click="goTo(current + 1)">下一页</button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 34px;
}

.page-btn,
.page-num {
  border: 1px solid var(--glass-border);
  min-width: 46px;
  padding: 11px 18px;
  border-radius: var(--radius-sm);
  background: var(--glass-bg);
  cursor: pointer;
  font-size: 15px;
  color: var(--text);
  transition:
    background var(--motion-fast) var(--ease-out),
    color var(--motion-fast) var(--ease-out),
    box-shadow var(--motion-fast) var(--ease-out),
    transform var(--motion-fast) var(--ease-out);
  user-select: none;
  box-shadow: 0 12px 28px rgba(35, 27, 18, 0.1);
  backdrop-filter: blur(14px) saturate(1.1);
  -webkit-backdrop-filter: blur(14px) saturate(1.1);
}

.page-btn:hover:not(:disabled),
.page-num:hover:not(.active) {
  background: var(--accent-soft);
  color: var(--text-strong);
  transform: translateY(-2px);
  box-shadow: 0 16px 34px rgba(35, 27, 18, 0.16);
}

.page-num.active {
  background: var(--accent);
  color: #21180f;
  font-weight: 600;
  box-shadow: 0 14px 36px var(--accent-glow);
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
