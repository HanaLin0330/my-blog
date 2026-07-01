import { createApp } from 'vue'
import router from './router'
import { siteConfig } from './config/site.js'
import './style.css'
import App from './App.vue'

document.title = siteConfig.title

const savedTheme = localStorage.getItem('theme')
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
document.documentElement.dataset.theme = savedTheme || (prefersDark ? 'dark' : 'light')

const app = createApp(App)
app.use(router)
app.mount('#app')
