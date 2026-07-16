import { onUnmounted } from 'vue'

/**
 * useScrollReveal — 滚动揭示动画 composable
 *
 * IntersectionObserver 扫描 .reveal 元素，
 * 进入视口时添加 .visible class 触发 CSS 淡入+上移动画。
 * 每元素只触发一次，触发后取消监听。
 *
 * 用法：
 *   const { refresh, observe } = useScrollReveal()
 *   onMounted(() => refresh())
 */

export function useScrollReveal() {
  /** IntersectionObserver 实例，null 表示尚未初始化 */
  let observer: IntersectionObserver | null = null

  /** 扫描页面中所有 .reveal 元素并开始观察 */
  function refresh(): void {
    if (observer) observer.disconnect()

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // 只触发一次
            observer!.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    document.querySelectorAll('.reveal').forEach((el) => {
      observer!.observe(el)
    })
  }

  /** 手动观察一个特定元素（动态添加场景） */
  function observe(el: Element): void {
    if (observer) observer.observe(el)
  }

  // 卸载时断开
  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  return { refresh, observe }
}
