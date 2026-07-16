<!--
  PricingCard — 定价卡片组件
  - 支持 featured 高亮模式（金色边框 + 微放大 + 推荐标签）
  - 包含：套餐名、价格、周期、功能列表、CTA 按钮
  - 非高亮卡片的按钮为次按钮样式
-->
<template>
  <div class="pricing-card" :class="{ featured }">
    <!-- 推荐标签（仅高亮卡显示） -->
    <span v-if="badge" class="pricing-badge">{{ badge }}</span>

    <p class="pricing-name">{{ name }}</p>
    <p class="pricing-price">{{ price }}</p>
    <p class="pricing-period">{{ period }}</p>

    <ul class="pricing-features">
      <li v-for="(feat, i) in features" :key="i">{{ feat }}</li>
    </ul>

    <button class="btn-primary">{{ cta }}</button>
  </div>
</template>

<script setup lang="ts">
/** 定价卡片数据契约 */
interface PricingCardProps {
  /** 套餐名称 */
  name: string
  /** 价格文字（"免费" / "¥199" / "定制"） */
  price: string
  /** 付费周期说明 */
  period: string
  /** 功能列表 */
  features: string[]
  /** CTA 按钮文字 */
  cta: string
  /** 推荐标签文字（空字符串则不显示） */
  badge?: string
  /** 是否为高亮推荐卡片 */
  featured?: boolean
}

defineProps<PricingCardProps>()
</script>

<style scoped>
.pricing-card {
  background: var(--surface-1);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-lg);
  padding: 40px 32px;
  text-align: left;
  position: relative;
  transition:
    border-color 300ms var(--ease-out),
    background 300ms var(--ease-out),
    transform 300ms var(--ease-out);
}

.pricing-card:hover {
  border-color: var(--hairline-hover);
}

/* ── 高亮卡片：金色边框 + 微放大 + 深色背景 ──────────────── */
.pricing-card.featured {
  border-color: rgba(232, 135, 10, 0.3);
  background: var(--surface-2);
  transform: scale(1.03);
}

.pricing-card.featured:hover {
  border-color: rgba(232, 135, 10, 0.5);
  transform: scale(1.05);
}

/* ── 推荐标签 ─────────────────────────────────────────────── */
.pricing-badge {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 999px;
  background: rgba(232, 135, 10, 0.12);
  color: var(--mesh-gold);
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 20px;
}

/* ── 套餐名 / 价格 / 周期 ─────────────────────────────────── */
.pricing-name {
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.015em;
  margin-bottom: 12px;
}

.pricing-price {
  font-family: var(--font-display);
  font-size: 44px;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin-bottom: 4px;
}

.pricing-period {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 28px;
}

/* ── 功能列表 ─────────────────────────────────────────────── */
.pricing-features {
  list-style: none;
  margin-bottom: 32px;
}

.pricing-features li {
  padding: 8px 0;
  font-size: 14px;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  gap: 10px;
}

/* ✓ 符号使用金色 */
.pricing-features li::before {
  content: '✓';
  color: var(--mesh-gold);
  font-size: 12px;
  flex-shrink: 0;
}

/* ── CTA 按钮适配 ─────────────────────────────────────────── */
.pricing-card .btn-primary {
  width: 100%;
  text-align: center;
  padding: 12px 24px;
  font-size: 14px;
}

/* 非高亮卡片：按钮改为次按钮样式 */
.pricing-card:not(.featured) .btn-primary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--hairline);
}

.pricing-card:not(.featured) .btn-primary:hover {
  background: var(--surface-3);
}

/* ── 响应式：手机端移除放大效果 ──────────────────────────── */
@media (max-width: 960px) {
  .pricing-card.featured {
    transform: none;
  }
  .pricing-card.featured:hover {
    transform: none;
  }
}
</style>
