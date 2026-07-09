<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const backgroundFileNames = [
  'background-01.jpg',
  'background-02.jpg',
  'background-03.jpg',
  'background-04.jpg',
  'background-05.jpg',
  'background-06.jpg',
  'background-07.jpg',
  'background-08.jpg',
  'background-09.jpg',
]

const localBackgrounds = Object.entries(import.meta.glob('../../background/*.{jpg,jpeg,png,gif,webp,svg,bmp}', {
  eager: true,
  import: 'default',
  query: '?url',
}))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)

const cdnBase = import.meta.env.VITE_BACKGROUND_CDN_BASE?.replace(/\/$/, '')
const cdnBackgrounds = cdnBase
  ? backgroundFileNames.map(name => `${cdnBase}/${name}`)
  : []

const route = useRoute()
const loaded = ref(false)
const urls = ref([])
const activeUrl = ref('')
const routeChanging = ref(false)
const preloadedUrls = new Set()
let rotationTimer = null
let routeTimer = null
let idlePreloadId = null

function onLoad() {
  loaded.value = true
  preloadRest()
}

function onError() {
  loaded.value = false
  pickRandomUrl()
}

function pickRandomUrl() {
  if (!urls.value.length) return
  const candidates = urls.value.filter(url => url !== activeUrl.value)
  const pool = candidates.length ? candidates : urls.value
  activeUrl.value = pool[Math.floor(Math.random() * pool.length)]
}

function scheduleRotation(delay = 24000) {
  stopRotationTimer()
  if (urls.value.length <= 1) return
  rotationTimer = window.setTimeout(() => {
    pickRandomUrl()
    scheduleRotation()
  }, delay)
}

function stopRotationTimer() {
  if (rotationTimer) {
    window.clearTimeout(rotationTimer)
    rotationTimer = null
  }
}

function stopRouteTimer() {
  if (routeTimer) {
    window.clearTimeout(routeTimer)
    routeTimer = null
  }
}

function cancelIdlePreload() {
  if (!idlePreloadId) return
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(idlePreloadId)
  } else {
    window.clearTimeout(idlePreloadId)
  }
  idlePreloadId = null
}

function stopRotation() {
  stopRotationTimer()
  stopRouteTimer()
  cancelIdlePreload()
}

function preloadUrl(url) {
  if (!url || preloadedUrls.has(url)) return
  preloadedUrls.add(url)
  const img = new Image()
  img.decoding = 'async'
  img.src = url
}

function preloadRest() {
  cancelIdlePreload()
  const run = () => {
    urls.value
      .filter(url => url !== activeUrl.value)
      .forEach(preloadUrl)
    idlePreloadId = null
  }

  if ('requestIdleCallback' in window) {
    idlePreloadId = window.requestIdleCallback(run, { timeout: 2500 })
  } else {
    idlePreloadId = window.setTimeout(run, 1200)
  }
}

function loadBackgrounds() {
  urls.value = cdnBackgrounds.length ? cdnBackgrounds : localBackgrounds
  pickRandomUrl()
  scheduleRotation()
}

watch(activeUrl, () => {
  loaded.value = false
})

watch(
  () => route.fullPath,
  () => {
    routeChanging.value = true
    stopRotation()
    routeTimer = window.setTimeout(() => {
      routeChanging.value = false
      scheduleRotation()
    }, 420)
  }
)

onMounted(loadBackgrounds)
onUnmounted(stopRotation)
</script>

<template>
  <div class="bg-wrapper" :class="{ 'is-route-changing': routeChanging }">
    <div v-if="activeUrl" class="bg-image" :class="{ loaded }">
      <img
        :src="activeUrl"
        alt=""
        decoding="async"
        fetchpriority="high"
        loading="eager"
        @load="onLoad"
        @error="onError"
      />
    </div>
    <div class="bg-overlay"></div>
    <div class="bg-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.bg-wrapper {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.34), transparent 28%),
    linear-gradient(135deg, #b0bbb7 0%, #788884 48%, #405052 100%);
}

.bg-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
}

.bg-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.04);
  transition: opacity 560ms var(--ease-out);
  will-change: opacity;
}

.bg-image.loaded img {
  opacity: 1;
}

.bg-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: var(--page-overlay);
  transition: background var(--motion-slow) var(--ease-out);
}

.bg-content {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  padding-top: var(--nav-height);
}

@media (max-width: 700px) {
  .bg-content {
    padding-top: var(--nav-height);
  }
}

</style>
