/**
 * FaqAccordion 组件测试
 *
 * 覆盖：
 * - 手风琴模式：同时只展开一项
 * - 点击同一项收起
 * - 点击不同项切换
 * - aria-expanded 无障碍属性同步
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FaqAccordion from '../components/FaqAccordion.vue'

/** 测试用 FAQ 数据 */
const mockFaqs = [
  { q: '支持哪些语言？', a: 'JavaScript、Python、Go 等。' },
  { q: '我的代码安全吗？', a: '支持本地部署，代码不离开服务器。' },
  { q: '免费版有什么限制？', a: '最多 3 个仓库。' },
]

describe('FaqAccordion', () => {
  it('初始状态所有答案应隐藏', () => {
    const wrapper = mount(FaqAccordion, {
      props: { faqs: mockFaqs },
    })

    // 所有问题应可见，答案不可见
    expect(wrapper.text()).toContain('支持哪些语言？')
    expect(wrapper.text()).not.toContain('JavaScript、Python、Go 等')
  })

  it('点击问题应展开对应答案', async () => {
    const wrapper = mount(FaqAccordion, {
      props: { faqs: mockFaqs },
    })

    // 点击第一项
    await wrapper.findAll('.faq-question')[0].trigger('click')

    // 答案应可见
    expect(wrapper.text()).toContain('JavaScript、Python、Go 等')

    // aria-expanded 应为 true
    expect(
      wrapper.findAll('.faq-question')[0].attributes('aria-expanded'),
    ).toBe('true')
  })

  it('手风琴模式：点击第二项应收起第一项', async () => {
    const wrapper = mount(FaqAccordion, {
      props: { faqs: mockFaqs },
    })

    const questions = wrapper.findAll('.faq-question')

    // 展开第一项
    await questions[0].trigger('click')
    expect(wrapper.text()).toContain('JavaScript、Python、Go 等')

    // 展开第二项
    await questions[1].trigger('click')

    // 第一项答案应收起，第二项答案应展开
    expect(wrapper.text()).not.toContain('JavaScript、Python、Go 等')
    expect(wrapper.text()).toContain('支持本地部署')
  })

  it('点击已展开项应将其收起', async () => {
    const wrapper = mount(FaqAccordion, {
      props: { faqs: mockFaqs },
    })

    const first = wrapper.findAll('.faq-question')[0]

    // 展开
    await first.trigger('click')
    expect(wrapper.text()).toContain('JavaScript、Python、Go 等')

    // 再次点击收起
    await first.trigger('click')
    expect(wrapper.text()).not.toContain('JavaScript、Python、Go 等')
    expect(first.attributes('aria-expanded')).toBe('false')
  })
})
