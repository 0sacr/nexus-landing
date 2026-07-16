/**
 * FeatureCard 组件测试
 *
 * 覆盖：
 * - 基础渲染：icon / title / description 正确输出
 * - [data-glow] 属性存在（useMouseGlow composable 依赖）
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FeatureCard from '../components/FeatureCard.vue'

/** 模拟 SVG 图标（简化版） */
const mockIcon = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>'

/** 创建默认 props 的工厂函数 */
function createProps(overrides = {}) {
  return {
    icon: mockIcon,
    title: '深度代码图谱',
    description: 'Nexus 为你的整个代码库构建语义图谱。',
    ...overrides,
  }
}

describe('FeatureCard', () => {
  it('应渲染传入的 title 和 description', () => {
    const wrapper = mount(FeatureCard, {
      props: createProps(),
    })

    expect(wrapper.text()).toContain('深度代码图谱')
    expect(wrapper.text()).toContain('语义图谱')
  })

  it('应使用 v-html 渲染 icon SVG 字符串', () => {
    const wrapper = mount(FeatureCard, {
      props: createProps(),
    })

    const iconDiv = wrapper.find('.feature-icon')
    // v-html 将 SVG 字符串注入为 innerHTML
    expect(iconDiv.html()).toContain('<circle')
  })

  it('应包含 [data-glow] 属性用于鼠标光晕 composable', () => {
    const wrapper = mount(FeatureCard, {
      props: createProps(),
    })

    expect(wrapper.find('[data-glow]').exists()).toBe(true)
  })

  it('不同 props 应渲染不同内容', () => {
    const wrapper = mount(FeatureCard, {
      props: createProps({
        title: '自动化代码审查',
        description: '每个 PR 都获得深度审查。',
      }),
    })

    expect(wrapper.text()).toContain('自动化代码审查')
    expect(wrapper.text()).toContain('深度审查')
    expect(wrapper.text()).not.toContain('深度代码图谱')
  })
})
