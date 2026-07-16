/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

/**
 * Vite + Vitest 统一配置
 * - Vue 3 SFC 插件
 * - @ 别名 → src/
 * - test 字段为 Vitest 配置（jsdom 环境）
 */
export default defineConfig({
  /** GitHub Pages 部署在子目录 /nexus-landing/ 下，静态资源需要加此前缀 */
  base: '/nexus-landing/',

  plugins: [vue()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    port: 3000,
    open: true,
  },

  test: {
    /** jsdom 模拟浏览器 DOM */
    environment: 'jsdom',

    /** 测试文件匹配模式 */
    include: ['src/**/*.{test,spec}.{ts,js}'],

    /** 每次测试前引入全局 CSS 变量（避免组件渲染时缺失） */
    setupFiles: [],
  },
})
