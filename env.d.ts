/// <reference types="vite/client" />

/**
 * Vue 单文件组件 (SFC) 类型声明
 *
 * 让 TypeScript 认识 .vue 文件导入，
 * 并推导出组件的 props 类型。
 */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
