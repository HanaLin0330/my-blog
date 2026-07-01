<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'

const localBackgrounds = Object.values(import.meta.glob('../../background/*.{jpg,jpeg,png,gif,webp,svg,bmp}', {
  eager: true,
  import: 'default',
  query: '?url',
}))

const loaded = ref(false)
const urls = ref([])
const activeUrl = ref('')
let timer = null

function onLoad() {
  loaded.value = true
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

function startRotation() {
  stopRotation()
  if (urls.value.length <= 1) return
  timer = window.setInterval(pickRandomUrl, 24000)
}

function stopRotation() {
  if (timer) {
    window.clearInterval(timer)
    timer = null
  }
}

function loadBackgrounds() {
  urls.value = localBackgrounds
  pickRandomUrl()
  startRotation()
}

watch(activeUrl, () => {
  loaded.value = false
})

onMounted(loadBackgrounds)
onUnmounted(stopRotation)
</script>

<template>
  <div class="bg-wrapper">
    <div v-if="activeUrl" class="bg-image" :class="{ loaded }">
      <img :src="activeUrl" alt="" @load="onLoad" @error="onError" />
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
  transition:
    opacity 1.05s var(--ease-out),
    transform 1.8s var(--ease-soft);
  will-change: opacity, transform;
}

.bg-image.loaded img {
  opacity: 1;
  animation: background-drift 24s ease-in-out infinite alternate;
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
    padding-top: 112px;
  }
}

@keyframes background-drift {
  0% {
    transform: scale(1.04) translate3d(-0.8%, -0.6%, 0);
  }
  100% {
    transform: scale(1.09) translate3d(0.8%, 0.6%, 0);
  }
}
</style>
