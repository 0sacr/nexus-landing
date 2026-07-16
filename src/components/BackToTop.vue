<!--
  BackToTop — 返回顶部浮动按钮
  滚动超过 600px 后渐显，点击平滑滚动到顶部。
  使用 position: fixed 始终保持在视口右下角。
-->
<template>
  <button
    class="back-to-top"
    :class="{ visible: show }"
    aria-label="返回顶部"
    title="返回顶部"
    @click="scrollToTop"
  >
    ↑
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const show = ref<boolean>(false)
let ticking = false

/** 滚动监听（RAF 节流），超过 600px 显示按钮 */
function onScroll(): void {
  if (!ticking) {
    requestAnimationFrame(() => {
      show.value = window.scrollY > 600
      ticking = false
    })
    ticking = true
  }
}

/** 平滑滚动到页面顶部 */
function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 76px;
  right: 20px;
  z-index: 199;

  width: 44px;
  height: 44px;
  border-radius: 50%;

  background: var(--surface-2);
  border: 1px solid var(--hairline);
  color: var(--text-primary);
  font-size: 18px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  /* 默认不可见 */
  opacity: 0;
  pointer-events: none;
  backdrop-filter: blur(12px);

  transition:
    opacity 300ms var(--ease-out),
    background 200ms var(--ease-out),
    transform 200ms var(--ease-out);
}

/* 滚动超过阈值后显示 */
.back-to-top.visible {
  opacity: 1;
  pointer-events: auto;
}

.back-to-top:hover {
  background: var(--surface-3);
  transform: translateY(-2px);
}
</style>
