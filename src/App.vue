<script setup>
import NavBar from './components/NavBar.vue'
import PageBackground from './components/PageBackground.vue'
</script>

<template>
  <PageBackground>
    <div id="app-root">
      <NavBar />
      <main>
      <router-view v-slot="{ Component, route }">
        <Transition name="page" mode="out-in" appear>
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </router-view>
      </main>
    </div>
  </PageBackground>
</template>

<style>
#app-root {
  min-height: 100vh;
}
</style>
