<!--
  SkipLink — 无障碍"跳过导航"链接
  键盘用户 Tab 到页面时首先看到，可跳过导航直接到达内容区
-->
<template>
  <a href="#main-content" class="skip-link">跳到内容</a>
</template>

<script setup lang="ts">
// 纯 CSS 组件，无需 JS 逻辑
</script>

<style scoped>
.skip-link {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 1000;
  padding: 10px 20px;
  border-radius: 6px;
  background: var(--cta-bg);
  color: var(--cta-text);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;

  /* 默认隐藏在上方 */
  transform: translateY(-120px);
  transition: transform 200ms var(--ease-out);
}

/* 获得焦点时滑入视口 */
.skip-link:focus {
  transform: translateY(0);
}
</style>
