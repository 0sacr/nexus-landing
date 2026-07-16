<!--
  StatItem — 统计数字组件
  - 大号金色渐变数字，由 useCountUp composable 驱动滚动动画
  - 数字带有 data-count 属性，进入视口时自动触发计数
  - suffix 用于追加单位（如 "+"、"%"、" 万"）
-->
<template>
  <div class="stat-item">
    <div class="stat-value">
      <span :data-count="count">0</span>{{ suffix }}
    </div>
    <div class="stat-label">{{ label }}</div>
  </div>
</template>

<script setup lang="ts">
/** 统计数据项契约 */
interface StatItemProps {
  /** 目标数字字符串（支持小数点），如 "12800"、"99.99" */
  count: string
  /** 数字后单位，如 "+"、"%" */
  suffix?: string
  /** 统计项标签 */
  label: string
}

defineProps<StatItemProps>()
</script>

<style scoped>
.stat-item {
  background: var(--surface-1);
  padding: 48px 32px;
  transition: background 300ms var(--ease-out);
  position: relative;
}

.stat-item:hover {
  background: var(--surface-2);
}

/* ── 数字：大号金色渐变 ──────────────────────────────────── */
.stat-value {
  font-family: var(--font-display);
  font-size: 44px;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin-bottom: 6px;
  background: linear-gradient(135deg, var(--text-primary), var(--mesh-gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 13px;
  color: var(--text-muted);
  font-weight: 500;
}
</style>
