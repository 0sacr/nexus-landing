<!--
  GradientMesh — Hero 区渐变网格背景 + 鼠标视差

  4 个超大模糊径向渐变 blob：
  - CSS @keyframes 驱动自主漂移动画
  - 鼠标在 Hero 区移动时，每个 blob 额外偏移，产生视差深度感
  - 不同 blob 偏移量不同（近大远小），模拟空间层次
  - 使用 requestAnimationFrame + CSS transform 叠加，性能友好
-->
<template>
  <div ref="mesh" class="hero-mesh" aria-hidden="true">
    <div
      v-for="i in 4"
      :key="i"
      class="mesh-blob"
      :style="blobStyle(i - 1) as Record<string, string>"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

/** 网格容器 DOM 引用 */
const mesh = ref<HTMLElement | null>(null)

/** 当前鼠标位置（归一化：-0.5 ~ +0.5 相对视口中心） */
const mouseX = ref(0)
const mouseY = ref(0)

/** 四个 blob 的视差强度系数（不同深度感） */
const parallaxFactors: readonly number[] = [0.6, 1.0, 0.8, 1.2]

/**
 * 计算每个 blob 的额外 transform
 * 在 CSS keyframes 基础上叠加视差偏移
 */
function blobStyle(index: number): Record<string, string> {
  const factor = parallaxFactors[index]
  const offsetX = mouseX.value * 30 * factor
  const offsetY = mouseY.value * 30 * factor
  return {
    '--parallax-x': `${offsetX}px`,
    '--parallax-y': `${offsetY}px`,
  }
}

let rafId: number | null = null
let targetX = 0
let targetY = 0
let currentX = 0
let currentY = 0

/** Hero 区 mousemove：归一化鼠标位置（-0.5 ~ +0.5） */
function onMouseMove(e: MouseEvent): void {
  targetX = e.clientX / window.innerWidth - 0.5
  targetY = e.clientY / window.innerHeight - 0.5
}

/** RAF 循环：lerp 平滑跟随，避免生硬跳变 */
function update(): void {
  // lerp 因子 0.08 = 慢速跟随
  currentX += (targetX - currentX) * 0.08
  currentY += (targetY - currentY) * 0.08
  mouseX.value = currentX
  mouseY.value = currentY
  rafId = requestAnimationFrame(update)
}

onMounted(() => {
  // 监听 Hero 区（父容器）的鼠标移动
  const hero = mesh.value?.parentElement
  if (hero) {
    hero.addEventListener('mousemove', onMouseMove, { passive: true })
  }
  rafId = requestAnimationFrame(update)
})

onUnmounted(() => {
  const hero = mesh.value?.parentElement
  if (hero) {
    hero.removeEventListener('mousemove', onMouseMove)
  }
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
/* ── 网格容器：覆盖 Hero 区并略微超出，确保边角不漏光 ──── */
.hero-mesh {
  position: absolute;
  inset: -20%;
  pointer-events: none;
}

/* ── 单个 blob ──────────────────────────────────────────────── */
.mesh-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(150px);
  opacity: 0.28;
  /* CSS keyframes + 内联 --parallax-x/y 叠加 */
  animation: meshDrift 24s ease-in-out infinite alternate;
  transform: translate(var(--parallax-x, 0px), var(--parallax-y, 0px));
}

/* ── 四个 blob 各自的位置、颜色和动画参数 ─────────────────── */
.mesh-blob:nth-child(1) {
  width: 700px;
  height: 700px;
  background: var(--mesh-teal);
  top: 5%;
  left: 10%;
  animation-delay: 0s;
  animation-duration: 28s;
}

.mesh-blob:nth-child(2) {
  width: 550px;
  height: 550px;
  background: var(--mesh-rose);
  top: 35%;
  right: 5%;
  animation-delay: -8s;
  animation-duration: 22s;
}

.mesh-blob:nth-child(3) {
  width: 500px;
  height: 500px;
  background: var(--mesh-amber);
  bottom: 10%;
  left: 35%;
  animation-delay: -16s;
  animation-duration: 26s;
}

.mesh-blob:nth-child(4) {
  width: 400px;
  height: 400px;
  background: var(--mesh-gold);
  top: 55%;
  left: 55%;
  animation-delay: -4s;
  animation-duration: 30s;
}

/* ── 漂移动画：缓慢的平移 + 缩放循环 ──────────────────────── */
@keyframes meshDrift {
  0% {
    transform: translate(var(--parallax-x, 0px), var(--parallax-y, 0px)) scale(1);
  }
  33% {
    transform: translate(
        calc(var(--parallax-x, 0px) + 60px),
        calc(var(--parallax-y, 0px) - 40px)
      )
      scale(1.08);
  }
  66% {
    transform: translate(
        calc(var(--parallax-x, 0px) - 30px),
        calc(var(--parallax-y, 0px) + 50px)
      )
      scale(0.94);
  }
  100% {
    transform: translate(
        calc(var(--parallax-x, 0px) + 20px),
        calc(var(--parallax-y, 0px) - 20px)
      )
      scale(1.04);
  }
}
</style>
