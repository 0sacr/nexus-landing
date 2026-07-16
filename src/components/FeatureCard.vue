<!--
  FeatureCard — 功能卡片组件
  - 接收 icon（SVG 字符串）、title、description props
  - 鼠标悬浮时显示跟随光标的琥珀色光晕（::before + --mx/--my）
  - 使用 useMouseGlow composable 驱动
  - 数据从 App.vue 的 features 数组通过 props 传入
-->
<template>
  <div class="feature-card" data-glow>
    <!-- 图标区：36px 方形容器，金色描边 -->
    <div class="feature-icon" v-html="icon"></div>

    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
/**
 * FeatureCard — 功能卡片
 *
 * Props 从 App.vue 的 features 数组传入。
 * icon 使用 SVG innerHTML 渲染，避免额外组件层级。
 */

/** 功能卡片数据契约 */
interface FeatureCardProps {
  /** SVG 图标字符串（v-html 渲染） */
  icon: string
  /** 功能标题 */
  title: string
  /** 功能描述 */
  description: string
}

defineProps<FeatureCardProps>()
</script>

<style scoped>
/* ── 卡片容器 ─────────────────────────────────────────────── */
.feature-card {
  background: var(--surface-1);
  padding: 40px 36px;
  position: relative;
  overflow: hidden;
  transition: background 300ms var(--ease-out);
  cursor: default;
}

/* ── 鼠标跟随光晕层 ─────────────────────────────────────────
   使用 CSS 自定义属性 --mx / --my 定位 radial-gradient 中心
   useMouseGlow composable 在 mousemove 时更新这两个变量
   ─────────────────────────────────────────────────────────── */
.feature-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(
    600px circle at var(--mx, 50%) var(--my, 50%),
    var(--accent-glow),
    transparent 50%
  );
  opacity: 0;
  transition: opacity 400ms var(--ease-out);
  pointer-events: none;
  z-index: 0;
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card:hover {
  background: var(--surface-2);
}

/* 确保内容在光晕之上 */
.feature-card > * {
  position: relative;
  z-index: 1;
}

/* ── 图标 ─────────────────────────────────────────────────── */
.feature-icon {
  width: 36px;
  height: 36px;
  margin-bottom: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  background: var(--surface-3);
  border: 1px solid var(--hairline);
  color: var(--mesh-gold);
  font-size: 18px;
}

/* ── 标题 ─────────────────────────────────────────────────── */
.feature-card h3 {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.015em;
  margin-bottom: 10px;
  color: var(--text-primary);
}

/* ── 描述 ─────────────────────────────────────────────────── */
.feature-card p {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
}
</style>
