/**
 * main.ts — Vue 3 应用入口（TypeScript）
 *
 * 挂载顺序：
 * 1. 全局设计令牌 CSS 文件
 * 2. createApp(App) 创建 Vue 实例
 * 3. mount('#app') 挂载到 DOM
 */

import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/design-tokens.css'

const app = createApp(App)
app.mount('#app')
