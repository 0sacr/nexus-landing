<!--
  TerminalTypewriter — 终端打字机组件
  模拟命令行终端的逐字打印效果：
  - 顶部红黄绿三色圆点（macOS 风格）
  - 逐行逐字打印，每字符 ~35ms + 随机抖动
  - 行间停顿 400ms
  - 金色闪烁光标跟随当前行
  - 使用 useTypewriter composable 驱动
-->
<template>
  <div class="hero-terminal">
    <!-- 终端标题栏：红黄绿圆点 -->
    <div class="hero-terminal-bar">
      <span></span>
      <span></span>
      <span></span>
    </div>

    <!-- 终端内容：每行一个 .line，由 composable 逐字打印 -->
    <div ref="terminalBody" class="hero-terminal-body">
      <span class="line comment"># Nexus 理解你的整个技术栈</span>
      <span class="line"><span class="prompt">$</span> <span class="output">nexus init --scan</span></span>
      <span class="line dim">▸ 已索引 3 个仓库中的 12,847 个文件</span>
      <span class="line dim">▸ 已构建语义图谱：847 类型 · 2,103 导入关系</span>
      <span class="line"><span class="prompt">$</span> <span class="output">nexus ask "把认证从 Cookie 迁移到 JWT"</span></span>
      <span class="line dim">▸ 已分析 34 个文件，生成 PR #142</span>
      <span class="line dim">▸ 等待审查中。</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useTypewriter } from '../composables/useTypewriter'

/** 终端内容容器 DOM 引用 */
const terminalBody = ref<HTMLElement | null>(null)

// 初始化打字机效果
const { start, stop } = useTypewriter(terminalBody, {
  charDelay: 35,
  linePause: 400,
  startDelay: 1000,
})

onMounted(() => {
  start()
})

onUnmounted(() => {
  stop()
})
</script>

<style scoped>
/* ── 终端外壳 ─────────────────────────────────────────────── */
.hero-terminal {
  margin-top: 72px;
  width: 100%;
  max-width: 620px;
  text-align: left;
  background: var(--surface-1);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-md);
  overflow: hidden;
  position: relative;
  z-index: 1;

  /* Hero 区入场动画：最末位淡入 */
  animation: fadeInUp 800ms var(--ease-out) 400ms both;
}

/* ── 终端标题栏 ───────────────────────────────────────────── */
.hero-terminal-bar {
  display: flex;
  gap: 8px;
  padding: 14px 16px;
  border-bottom: 1px solid var(--hairline);
  background: var(--surface-2);
}

.hero-terminal-bar span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

/* macOS 风格三色圆点 */
.hero-terminal-bar span:nth-child(1) { background: #ff5f57; }  /* 红 */
.hero-terminal-bar span:nth-child(2) { background: #ffbd2e; }  /* 黄 */
.hero-terminal-bar span:nth-child(3) { background: #28ca41; }  /* 绿 */

/* ── 终端内容区 ───────────────────────────────────────────── */
.hero-terminal-body {
  padding: 24px 28px;
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 2;
}

.hero-terminal-body .line {
  display: block;
}

/* 文字颜色角色 */
.hero-terminal-body .prompt  { color: var(--mesh-gold); }   /* 提示符 $ */
.hero-terminal-body .output  { color: var(--text-primary); } /* 命令输出 */
.hero-terminal-body .comment { color: #52525b; }             /* 注释 */
.hero-terminal-body .dim     { color: #3f3f46; }             /* 次要信息 */

/* ── 行可见性控制（配合打字机 JS） ────────────────────────── */
.hero-terminal-body .line {
  opacity: 0;
  transition: opacity 80ms;
}

.hero-terminal-body .line.typed {
  opacity: 1;
}

/* ── 闪烁光标 ─────────────────────────────────────────────── */
.hero-terminal-body :deep(.cursor) {
  display: inline-block;
  width: 8px;
  height: 16px;
  background: var(--mesh-gold);
  vertical-align: middle;
  margin-left: 2px;
  animation: cursorBlink 1s step-end infinite;
}

@keyframes cursorBlink {
  50% { opacity: 0; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
