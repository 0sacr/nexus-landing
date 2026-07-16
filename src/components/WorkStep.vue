<!--
  WorkStep — 工作流程步骤组件
  - 大号渐变数字编号（金色渐变）
  - 标题 + 描述
  - 悬浮时边框高亮
  - 数据从 App.vue 的 steps 数组通过 props 传入
-->
<template>
  <div class="step">
    <div class="step-number">{{ number }}</div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
/** 工作流程步骤数据契约 */
interface WorkStepProps {
  /** 步骤编号，如 "01" */
  number: string
  /** 步骤标题 */
  title: string
  /** 步骤描述 */
  description: string
}

defineProps<WorkStepProps>()
</script>

<style scoped>
.step {
  text-align: center;
  position: relative;
  padding: 48px 32px 40px;
  background: var(--surface-1);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-lg);
  transition:
    border-color 300ms var(--ease-out),
    background 300ms var(--ease-out);
}

.step:hover {
  border-color: var(--hairline-hover);
  background: var(--surface-2);
}

/* ── 大号渐变数字 ─────────────────────────────────────────── */
.step-number {
  font-family: var(--font-display);
  font-size: 56px;
  font-weight: 700;
  letter-spacing: -0.03em;

  /* 金色渐变文字：从深金到琥珀 */
  background: linear-gradient(180deg, var(--mesh-gold), var(--mesh-amber));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  margin-bottom: 8px;
  line-height: 1;
}

.step h3 {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.015em;
  margin-bottom: 10px;
}

.step p {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.6;
}
</style>
