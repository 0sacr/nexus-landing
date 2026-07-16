<!--
  AppFooter — 页脚
  展示版权信息和底部导航链接。
-->
<template>
  <footer class="footer container">
    <span>◆ Nexus — 为构建者而生。</span>

    <ul class="footer-links">
      <li><a href="#">文档</a></li>
      <li><a href="#">GitHub</a></li>
      <li><a href="#">更新日志</a></li>
      <li><a href="#">隐私政策</a></li>
      <li><a href="#">服务条款</a></li>
    </ul>
  </footer>
</template>

<script setup lang="ts">
// 纯展示组件，无交互逻辑
</script>

<style scoped>
.footer {
  padding: 40px 0;
  border-top: 1px solid var(--hairline);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: var(--text-muted);
}

.footer-links {
  display: flex;
  gap: 28px;
  list-style: none;
}

.footer-links a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color 200ms var(--ease-out);
}

.footer-links a:hover {
  color: var(--text-primary);
}

/* ── 响应式：手机端纵向堆叠 ──────────────────────────────── */
@media (max-width: 600px) {
  .footer {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
</style>
