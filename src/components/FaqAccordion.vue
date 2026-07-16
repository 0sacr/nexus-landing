<!--
  FaqAccordion — FAQ 折叠面板组件

  - 点击问题展开/收起答案
  - Vue <Transition> 驱动展开/收起动画（max-height + opacity）
  - 同一时间只展开一项（手风琴模式）
  - 数据从父组件通过 faqs prop 传入
-->
<template>
  <div class="faq-list">
    <div
      v-for="(faq, i) in faqs"
      :key="i"
      class="faq-item"
      :class="{ open: activeIndex === i }"
    >
      <!-- 问题行：点击切换展开/收起 -->
      <button
        class="faq-question"
        @click="toggle(i)"
        :aria-expanded="activeIndex === i"
      >
        <span>{{ faq.q }}</span>
        <!-- 加号/减号图标 -->
        <span class="faq-icon">{{ activeIndex === i ? '−' : '+' }}</span>
      </button>

      <!-- 答案区：Transition 包裹，展开时渐显+下滑 -->
      <Transition name="faq">
        <div v-if="activeIndex === i" class="faq-answer">
          <p>{{ faq.a }}</p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

/** FAQ 条目数据契约 */
interface FaqItem {
  /** 问题 */
  q: string
  /** 答案 */
  a: string
}

/** FAQ 组件 Props */
interface FaqAccordionProps {
  /** FAQ 数据数组 */
  faqs: FaqItem[]
}

defineProps<FaqAccordionProps>()

/** 当前展开项索引，-1 表示全部收起 */
const activeIndex = ref<number>(-1)

/** 点击切换：同一项收起，不同项切换 */
function toggle(index: number): void {
  activeIndex.value = activeIndex.value === index ? -1 : index
}
</script>

<style scoped>
/* ── 列表容器 ─────────────────────────────────────────────── */
.faq-list {
  max-width: 680px;
  margin: 56px auto 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
  background: var(--hairline);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

/* ── 单项 ─────────────────────────────────────────────────── */
.faq-item {
  background: var(--surface-1);
  transition: background 250ms var(--ease-out);
}

.faq-item.open {
  background: var(--surface-2);
}

/* ── 问题按钮 ─────────────────────────────────────────────── */
.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 20px 28px;
  background: none;
  border: none;
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  letter-spacing: -0.01em;
  transition: color 200ms var(--ease-out);
}

.faq-question:hover {
  color: var(--mesh-gold);
}

/* ── 加减号图标 ───────────────────────────────────────────── */
.faq-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid var(--hairline);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 400;
  color: var(--text-muted);
  transition:
    border-color 200ms var(--ease-out),
    color 200ms var(--ease-out);
}

.faq-item.open .faq-icon {
  border-color: var(--mesh-gold);
  color: var(--mesh-gold);
}

/* ── 答案内容 ─────────────────────────────────────────────── */
.faq-answer {
  overflow: hidden;
}

.faq-answer p {
  padding: 0 28px 24px;
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* ── Vue Transition：展开/收起动画 ──────────────────────────
   使用 max-height + opacity 实现平滑的上下滑入效果
   进入：从 0 高度 + 透明 → 自然高度 + 不透明
   离开：反之
   ─────────────────────────────────────────────────────────── */
.faq-enter-active {
  transition:
    max-height 400ms var(--ease-out),
    opacity 300ms var(--ease-out);
}

.faq-leave-active {
  transition:
    max-height 300ms var(--ease-out),
    opacity 200ms var(--ease-out);
}

.faq-enter-from {
  max-height: 0;
  opacity: 0;
}

.faq-enter-to {
  max-height: 200px;
  opacity: 1;
}

.faq-leave-from {
  max-height: 200px;
  opacity: 1;
}

.faq-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
