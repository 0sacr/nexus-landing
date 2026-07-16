import { type Ref, onUnmounted } from 'vue'

/* ================================================================
   类型定义
   ================================================================ */

/** 打字机配置项 */
interface TypewriterOptions {
  /** 每个字符的延迟（毫秒），默认 35 */
  charDelay?: number
  /** 行间停顿（毫秒），默认 400 */
  linePause?: number
  /** 首行启动前的等待（毫秒），默认 1000 */
  startDelay?: number
}

/* ================================================================
   useTypewriter — 终端打字机效果 composable

   接收一个包含 .line 子元素的容器 DOM 引用，
   逐字符打印每一行，模拟终端输出节奏。

   用法：
     const { start, stop } = useTypewriter(terminalRef, { charDelay: 35 })
     onMounted(() => start())
     onUnmounted(() => stop())
   ================================================================ */

export function useTypewriter(
  containerRef: Ref<HTMLElement | null>,
  options: TypewriterOptions = {},
) {
  const { charDelay = 35, linePause = 400, startDelay = 1000 } = options

  /** 当前 setTimeout 句柄，用于清理 */
  let timer: ReturnType<typeof setTimeout> | null = null

  /** 停止标志，防止卸载后继续执行 */
  let stopped = false

  /** 启动打字动画 */
  function start(): void {
    if (!containerRef.value) return

    const body = containerRef.value
    const lines: NodeListOf<HTMLElement> = body.querySelectorAll('.line')
    if (lines.length === 0) return

    // 清理残留光标
    const oldCursor = body.querySelector('.cursor')
    if (oldCursor) oldCursor.remove()

    // 创建闪烁光标
    const cursor = document.createElement('span')
    cursor.className = 'cursor'
    body.appendChild(cursor)

    /** 逐行打印递归 */
    function typeLine(idx: number): void {
      if (stopped) return

      if (idx >= lines.length) {
        cursor.style.display = 'none'
        return
      }

      const el = lines[idx]
      const fullText = el.textContent ?? ''
      el.textContent = ''
      el.classList.add('typed')

      let charIndex = 0

      function typeChar(): void {
        if (stopped) return

        if (charIndex < fullText.length) {
          el.textContent += fullText.charAt(charIndex)
          charIndex++
          el.appendChild(cursor)
          timer = setTimeout(typeChar, charDelay + Math.random() * 20)
        } else {
          const nextIdx = idx + 1
          if (nextIdx < lines.length) {
            lines[nextIdx].classList.add('typed')
            lines[nextIdx].textContent = ''
            lines[nextIdx].appendChild(cursor)
            timer = setTimeout(() => typeLine(nextIdx), linePause)
          } else {
            cursor.style.display = 'none'
          }
        }
      }

      typeChar()
    }

    // Hero 入场动画结束后启动
    timer = setTimeout(() => typeLine(0), startDelay)
  }

  /** 停止动画并清理定时器 */
  function stop(): void {
    stopped = true
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
    if (containerRef.value) {
      const cursor = containerRef.value.querySelector('.cursor')
      if (cursor) cursor.remove()
    }
  }

  // 组件卸载自动清理
  onUnmounted(() => stop())

  return { start, stop }
}
