<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Moon, Sun } from '@lucide/vue'

const route = useRoute()
const theme = ref('light')

const navItems = [
  { path: '/', label: '首页' },
  { path: '/blog', label: '博客' },
  { path: '/about', label: '关于' },
  { path: '/friends', label: '友链' },
  { path: '/social', label: '社交' },
]

const currentPath = computed(() => route.path)
const themeTitle = computed(() => (theme.value === 'dark' ? '切换到浅色模式' : '切换到暗色模式'))

function isActive(item) {
  if (item.path === '/') return currentPath.value === '/'
  return currentPath.value.startsWith(item.path)
}

function setTheme(nextTheme) {
  theme.value = nextTheme
  document.documentElement.dataset.theme = nextTheme
  localStorage.setItem('theme', nextTheme)
}

function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}

onMounted(() => {
  theme.value = document.documentElement.dataset.theme || 'light'
})
</script>

<template>
  <nav class="navbar">
    <div class="nav-inner">
      <RouterLink class="nav-brand" to="/">Hana's Blog</RouterLink>
      <div class="nav-actions">
        <div class="nav-links">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ active: isActive(item) }"
          >
            {{ item.label }}
          </RouterLink>
        </div>
        <button
          class="theme-toggle"
          type="button"
          :aria-label="themeTitle"
          :title="themeTitle"
          @click="toggleTheme"
        >
          <Sun v-if="theme === 'dark'" class="theme-icon" :size="22" :stroke-width="1.9" />
          <Moon v-else class="theme-icon" :size="22" :stroke-width="1.9" />
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 11px 24px;
  overflow: hidden;
  isolation: isolate;
  background: var(--nav-bg);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: 0 12px 34px rgba(22, 16, 10, 0.13);
  backdrop-filter: blur(14px) saturate(1.12);
  -webkit-backdrop-filter: blur(14px) saturate(1.12);
  animation: nav-reveal 360ms var(--ease-out) both;
}

.nav-inner {
  max-width: 1200px;
  height: 56px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.nav-brand {
  font-size: 19px;
  font-weight: 760;
  color: var(--text-strong);
  text-decoration: none;
  letter-spacing: 0;
  user-select: none;
  transition:
    color var(--motion-fast) var(--ease-out),
    transform var(--motion-fast) var(--ease-out);
}

.nav-brand:hover {
  transform: translateY(-1px);
}

.nav-actions,
.nav-links {
  display: flex;
  align-items: center;
}

.nav-actions {
  gap: 10px;
}

.nav-links {
  gap: 4px;
}

.nav-link,
.theme-toggle {
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  color: var(--text);
  background: transparent;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  transition:
    color 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s var(--ease-out);
  font-size: 15px;
  font-weight: 600;
}

.nav-link::before,
.theme-toggle::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 10%, rgba(255, 255, 255, 0.22), transparent 55%);
  transform: translateX(-120%);
  transition: transform 520ms var(--ease-out);
}

.nav-link {
  padding: 10px 18px;
}

.theme-toggle {
  width: 46px;
  height: 46px;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.theme-icon {
  display: block;
  color: currentColor;
  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

.theme-toggle:hover .theme-icon {
  transform: rotate(-12deg) scale(1.08);
}

.nav-link:hover,
.theme-toggle:hover {
  color: var(--text-strong);
  background: var(--accent-soft);
  border-color: var(--glass-border);
  transform: translateY(-1px);
}

.nav-link:hover::before,
.theme-toggle:hover::before {
  transform: translateX(120%);
}

.nav-link.active {
  color: var(--text-strong);
  background: var(--accent-soft);
  border-color: rgba(215, 189, 146, 0.44);
  box-shadow: 0 10px 26px var(--accent-glow);
}

@keyframes nav-reveal {
  from {
    transform: translateY(-18px);
  }
  to {
    transform: translateY(0);
  }
}

@media (max-width: 700px) {
  .navbar {
    padding: 8px 10px;
  }

  .nav-inner {
    height: 48px;
    gap: 8px;
  }

  .nav-brand {
    flex: 0 0 auto;
    max-width: 72px;
    overflow: hidden;
    font-size: 0;
  }

  .nav-brand::after {
    content: 'Hana';
    font-size: 17px;
  }

  .nav-actions,
  .nav-links {
    min-width: 0;
  }

  .nav-actions {
    flex: 1;
    gap: 6px;
  }

  .nav-links {
    flex: 1;
    gap: 2px;
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .nav-links::-webkit-scrollbar {
    display: none;
  }

  .nav-link::before,
  .theme-toggle::before {
    display: none;
  }

  .nav-link {
    flex: 0 0 auto;
    padding: 8px 10px;
    font-size: 13px;
    line-height: 1;
    white-space: nowrap;
  }

  .theme-toggle {
    flex: 0 0 38px;
    width: 38px;
    height: 38px;
  }
}

@media (max-width: 390px) {
  .nav-brand {
    display: none;
  }

  .nav-link {
    padding-inline: 9px;
  }
}
</style>
