<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { siteConfig } from '../config/site.js'
import { getPaginatedPosts } from '../utils/posts.js'
import BlogCard from '../components/BlogCard.vue'
import Pagination from '../components/Pagination.vue'

const route = useRoute()
const posts = ref([])
const total = ref(0)
const currentPage = ref(1)
const loading = ref(true)
const pageSize = siteConfig.postsPerPage

function loadPosts(page = 1) {
  loading.value = true
  try {
    const data = getPaginatedPosts(page, pageSize)
    posts.value = data.posts
    total.value = data.total
    currentPage.value = data.page
  } catch (e) {
    console.error('加载文章失败:', e)
  } finally {
    loading.value = false
  }
}

function onPageChange(page) {
  loadPosts(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// 从 URL query 恢复页码（支持浏览器前进/后退）
onMounted(() => {
  const page = parseInt(route.query.page) || 1
  loadPosts(page)
})

// 监听路由 query 变化
watch(() => route.query.page, (newPage) => {
  const page = parseInt(newPage) || 1
  if (page !== currentPage.value) {
    loadPosts(page)
  }
})
</script>

<template>
  <div class="blog-page">
    <h1 class="page-title">博客文章</h1>

    <div v-if="loading" class="loading">文章加载中...</div>
    <template v-else>
      <div v-if="posts.length === 0" class="empty">
        <p>暂无文章，快去写一篇吧！</p>
      </div>

      <BlogCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />

      <Pagination
        :current="currentPage"
        :total="total"
        :page-size="pageSize"
        @change="onPageChange"
      />
    </template>
  </div>
</template>

<style scoped>
.blog-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 24px;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 32px;
  animation: float-in 620ms var(--ease-out) both;
}

.loading,
.empty {
  text-align: center;
  color: rgba(255, 255, 255, 0.86);
  font-size: 18px;
  padding: 60px 0;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius);
  box-shadow: var(--glass-shadow);
  backdrop-filter: blur(16px) saturate(1.12);
  -webkit-backdrop-filter: blur(16px) saturate(1.12);
  animation: float-in 620ms var(--ease-out) both;
}

@media (max-width: 640px) {
  .loading,
  .empty {
    padding: 36px 16px;
    font-size: 15px;
  }
}
</style>
