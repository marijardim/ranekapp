import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LoadingPage from '@/components/LoadingPage'

createApp(App).use(store).use(router).component('LoadingPage', LoadingPage).mount('#app')
