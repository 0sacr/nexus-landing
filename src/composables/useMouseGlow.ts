import { onUnmounted } from 'vue'

/**
 * 单个卡片的鼠标事件处理器对
 * 用于在 cleanup 阶段精确解绑
 */
interface CardListeners {
  onMove: (e: MouseEvent) => void
  onLeave: () => void
}

/**
 * useMouseGlow — 卡片鼠标跟随光晕 composable
 *
 * 监听 [data-glow] 卡片上的 mousemove，
 * 将鼠标相对位置写入 CSS 自定义属性 --mx / --my，
 * ::before 伪元素用 radial-gradient 绘制跟随光晕。
 *
 * 用法：
 *   const { apply, bind } = useMouseGlow()
 *   onMounted(() => apply())
 */

export function useMouseGlow() {
  /** 所有已绑定卡片的处理器映射，用于 cleanup */
  const listeners = new Map<HTMLElement, CardListeners>()

  /** 给单个卡片绑定发光追踪 */
  function bindCard(card: HTMLElement): void {
    if (listeners.has(card)) return

    function onMove(e: MouseEvent): void {
      const rect = card.getBoundingClientRect()
      card.style.setProperty(
        '--mx',
        `${((e.clientX - rect.left) / rect.width) * 100}%`,
      )
      card.style.setProperty(
        '--my',
        `${((e.clientY - rect.top) / rect.height) * 100}%`,
      )
    }

    function onLeave(): void {
      card.style.setProperty('--mx', '50%')
      card.style.setProperty('--my', '50%')
    }

    card.addEventListener('mousemove', onMove, { passive: true })
    card.addEventListener('mouseleave', onLeave)

    listeners.set(card, { onMove, onLeave })
  }

  /** 扫描页面上所有 [data-glow] 元素并绑定 */
  function apply(): void {
    document.querySelectorAll<HTMLElement>('[data-glow]').forEach((card) => {
      bindCard(card)
    })
  }

  /** 手动绑定单个元素 */
  function bind(card: HTMLElement): void {
    bindCard(card)
  }

  // 卸载时解绑全部监听器
  onUnmounted(() => {
    listeners.forEach(({ onMove, onLeave }, card) => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    })
    listeners.clear()
  })

  return { apply, bind }
}
