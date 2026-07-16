import { type Ref, onUnmounted } from 'vue'

/**
 * useCountUp — 数字滚动计数动画 composable
 *
 * requestAnimationFrame + quint ease-out 缓动，
 * 从 0 平滑滚动到 data-count 属性指定的目标数字。
 * 支持整数（自动千分位）和浮点数（保留两位小数）。
 *
 * 用法：
 *   const { observe } = useCountUp()
 *   const statsGrid = ref<HTMLElement | null>(null)
 *   onMounted(() => observe(statsGrid))
 */

export function useCountUp() {
  /** 已完成的 DOM 集合，防止重复触发 */
  const animatedSet = new WeakSet<HTMLElement>()

  /** requestAnimationFrame ID 集合，用于卸载清理 */
  const rafIds = new Set<number>()

  /** 对单个元素执行数字滚动 */
  function animateOne(el: HTMLElement): void {
    if (animatedSet.has(el)) return
    animatedSet.add(el)

    const raw = el.getAttribute('data-count')
    if (raw === null) return

    const target = parseFloat(raw)
    const isFloat = raw.includes('.')
    const duration = 2000

    const startTime = performance.now()

    function update(now: number): void {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // quint ease-out：先快后慢
      const eased = 1 - (1 - progress) ** 5
      const current = target * eased

      el.textContent = isFloat
        ? current.toFixed(2)
        : Math.floor(current).toLocaleString()

      if (progress < 1) {
        const id = requestAnimationFrame(update)
        rafIds.add(id)
      } else {
        // 确保最终值精确
        el.textContent = isFloat
          ? target.toFixed(2)
          : Math.floor(target).toLocaleString()
      }
    }

    const id = requestAnimationFrame(update)
    rafIds.add(id)
  }

  /**
   * 观察目标容器，进入视口时触发容器内所有 [data-count] 元素计数
   * @param containerRef — 统计区容器 DOM 引用
   * @param threshold  — IntersectionObserver 触发阈值
   */
  function observe(
    containerRef: Ref<HTMLElement | null>,
    threshold: number = 0.3,
  ): void {
    if (!containerRef.value) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const items: NodeListOf<HTMLElement> =
            containerRef.value!.querySelectorAll('[data-count]')
          items.forEach((el) => animateOne(el))
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(containerRef.value)

    onUnmounted(() => observer.disconnect())
  }

  // 组件卸载时取消所有进行中的动画帧
  onUnmounted(() => {
    rafIds.forEach((id) => cancelAnimationFrame(id))
    rafIds.clear()
  })

  return { observe }
}
