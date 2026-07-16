<!--
  NoiseOverlay — 全局噪点纹理叠加层
  使用 SVG feTurbulence 生成分形噪点，覆盖整个页面，
  模拟 Linear 风格的表层颗粒质感。opacity 极低（3.5%），
  不影响可读性，仅增加微妙的"实体感"。
-->
<template>
  <div class="noise-overlay" aria-hidden="true"></div>
</template>

<script setup lang="ts">
// 纯 CSS 实现，无需 JS
</script>

<style scoped>
.noise-overlay {
  /* 固定覆盖整个视口 */
  position: fixed;
  inset: 0;
  z-index: 9999;

  /* 不响应任何鼠标事件 */
  pointer-events: none;

  /* 透明度极低：刚好能感知但不干扰阅读 */
  opacity: 0.035;

  /* SVG feTurbulence 分形噪点纹理 */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px 200px;
}
</style>
