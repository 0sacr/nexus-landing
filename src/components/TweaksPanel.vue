<!--
  TweaksPanel — 调节面板（主题 / 密度 / 动效）
  - 齿轮按钮固定在右下角，点击展开面板
  - 三个调节维度：
    1. 主题色调：暖色(warm) ↔ 冷色(cool) — 切换 CSS 变量
    2. 密度：舒适(comfortable) ↔ 紧凑(compact) — 调整间距和宽度
    3. 动效：开/关 — 设置 data-motion 属性，CSS 全局暂停动画
  - 点击面板外自动关闭
-->
<template>
  <!-- 齿轮触发按钮 -->
  <button
    class="tweaks-toggle"
    aria-label="打开调节面板"
    title="调节"
    @click="toggle"
  >
    {{ open ? '✕' : '⚙' }}
  </button>

  <!-- 调节面板 -->
  <div class="tweaks-panel" :class="{ open }">
    <h3>调节面板</h3>

    <!-- 主题色调 -->
    <div class="tweaks-group">
      <label>主题色调</label>
      <select v-model="theme" @change="applyTheme">
        <option value="warm">暖色（默认）</option>
        <option value="cool">冷色</option>
      </select>
    </div>

    <!-- 密度 -->
    <div class="tweaks-group">
      <label>密度</label>
      <select v-model="density" @change="applyDensity">
        <option value="comfortable">舒适</option>
        <option value="compact">紧凑</option>
      </select>
    </div>

    <!-- 动效开关 -->
    <div class="tweaks-group">
      <label>动效 <span class="motion-label">{{ motionOn ? '开' : '关' }}</span></label>
      <input
        type="range"
        v-model.number="motionVal"
        min="0"
        max="1"
        step="1"
        @input="applyMotion"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

/** 面板展开状态 */
const open = ref<boolean>(false)
/** 当前主题 */
const theme = ref<string>('warm')
/** 当前密度 */
const density = ref<string>('comfortable')
/** 动效滑块值：1=开启，0=关闭 */
const motionVal = ref<number>(1)
/** 动效开启标记 */
const motionOn = ref<boolean>(true)

/** 切换面板显示/隐藏 */
function toggle(): void {
  open.value = !open.value
}

/** 点击面板外部关闭 */
function onClickOutside(e: MouseEvent): void {
  if (open.value && e.target instanceof Node) {
    const panel = document.querySelector('.tweaks-panel')
    const toggleBtn = document.querySelector('.tweaks-toggle')
    if (panel && !panel.contains(e.target) && toggleBtn && e.target !== toggleBtn) {
      open.value = false
    }
  }
}

/**
 * 应用主题切换
 * warm: 暖黑底 + 琥珀金强调色
 * cool: 纯黑底 + 蓝色强调色（Vercel 风格）
 */
function applyTheme(): void {
  const root = document.documentElement
  root.setAttribute('data-theme', theme.value)

  if (theme.value === 'cool') {
    root.style.setProperty('--ground', '#000000')
    root.style.setProperty('--surface-1', '#0A0A0A')
    root.style.setProperty('--surface-2', '#111111')
    root.style.setProperty('--mesh-teal', '#0070F3')
    root.style.setProperty('--mesh-rose', '#FF0080')
    root.style.setProperty('--mesh-amber', '#F5A623')
    root.style.setProperty('--mesh-gold', '#C88A3A')
    root.style.setProperty('--accent', '#0070F3')
    root.style.setProperty('--accent-glow', 'rgba(0,112,243,0.18)')
  } else {
    root.style.setProperty('--ground', '#08090A')
    root.style.setProperty('--surface-1', '#0F0F11')
    root.style.setProperty('--surface-2', '#16171C')
    root.style.setProperty('--mesh-teal', '#007A8B')
    root.style.setProperty('--mesh-rose', '#D9466C')
    root.style.setProperty('--mesh-amber', '#E8870A')
    root.style.setProperty('--mesh-gold', '#C88A3A')
    root.style.setProperty('--accent', '#E8870A')
    root.style.setProperty('--accent-glow', 'rgba(232,135,10,0.18)')
  }
}

/** 应用密度切换 */
function applyDensity(): void {
  const root = document.documentElement.style
  if (density.value === 'compact') {
    root.setProperty('--section-gap', '72px')
    root.setProperty('--content-max', '1280px')
  } else {
    root.setProperty('--section-gap', '120px')
    root.setProperty('--content-max', '1120px')
  }
}

/** 应用动效开关 */
function applyMotion(): void {
  motionOn.value = motionVal.value === 1
  document.documentElement.setAttribute(
    'data-motion',
    motionOn.value ? 'on' : 'off',
  )
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<style scoped>
/* ── 齿轮按钮 ─────────────────────────────────────────────── */
.tweaks-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 200;

  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--surface-2);
  border: 1px solid var(--hairline);
  color: var(--text-primary);
  font-size: 20px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(12px);
  transition:
    background 200ms var(--ease-out),
    transform 200ms var(--ease-out);
}

.tweaks-toggle:hover {
  background: var(--surface-3);
  transform: scale(1.08);
}

/* ── 面板 ─────────────────────────────────────────────────── */
.tweaks-panel {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 200;

  width: 280px;
  background: var(--surface-1);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);

  /* 默认隐藏 */
  display: none;
  animation: panelIn 200ms var(--ease-out);
}

.tweaks-panel.open {
  display: block;
}

@keyframes panelIn {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ── 面板标题 ─────────────────────────────────────────────── */
.tweaks-panel h3 {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 20px;
  color: var(--text-secondary);
}

/* ── 调节组 ───────────────────────────────────────────────── */
.tweaks-group {
  margin-bottom: 18px;
}

.tweaks-group label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 6px;
}

/* ── 下拉选择 ─────────────────────────────────────────────── */
.tweaks-group select {
  width: 100%;
  margin-top: 4px;
  background: var(--surface-2);
  color: var(--text-primary);
  border: 1px solid var(--hairline);
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 13px;
  font-family: var(--font-body);
  cursor: pointer;
}

/* ── 滑块 ─────────────────────────────────────────────────── */
.tweaks-group input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  margin-top: 4px;
  background: var(--surface-3);
  border-radius: 2px;
  cursor: pointer;
}

.tweaks-group input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--mesh-gold);
  cursor: pointer;
}

.motion-label {
  color: var(--mesh-gold);
  font-weight: 600;
}
</style>
