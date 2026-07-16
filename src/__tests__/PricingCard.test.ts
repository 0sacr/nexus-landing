/**
 * PricingCard 组件测试
 *
 * 覆盖：
 * - 普通卡片 vs 高亮卡片（featured）样式差异
 * - 推荐标签（badge）条件渲染
 * - CTA 按钮文字
 * - 功能列表渲染
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PricingCard from '../components/PricingCard.vue'

/** 普通卡片 props */
const normalProps = {
  name: '入门版',
  price: '免费',
  period: '适合个人及小型项目',
  features: ['最多 3 个仓库', '100 次 AI 交互 / 月'],
  cta: '立即开始',
  badge: '',
  featured: false,
}

/** 高亮卡片 props */
const featuredProps = {
  name: '专业版',
  price: '¥199',
  period: '每人 / 月',
  features: ['无限仓库', '无限 AI 交互'],
  cta: '免费试用',
  badge: '最受欢迎',
  featured: true,
}

describe('PricingCard', () => {
  it('应渲染套餐名和价格', () => {
    const wrapper = mount(PricingCard, {
      props: normalProps,
    })

    expect(wrapper.text()).toContain('入门版')
    expect(wrapper.text()).toContain('免费')
  })

  it('应渲染所有功能列表项', () => {
    const wrapper = mount(PricingCard, {
      props: normalProps,
    })

    const items = wrapper.findAll('.pricing-features li')
    expect(items).toHaveLength(2)
    expect(items[0].text()).toContain('最多 3 个仓库')
    expect(items[1].text()).toContain('100 次 AI 交互')
  })

  it('高亮卡片应有 .featured CSS class', () => {
    const wrapper = mount(PricingCard, {
      props: featuredProps,
    })

    expect(wrapper.find('.pricing-card.featured').exists()).toBe(true)
  })

  it('普通卡片不应有 .featured class', () => {
    const wrapper = mount(PricingCard, {
      props: normalProps,
    })

    expect(wrapper.find('.pricing-card.featured').exists()).toBe(false)
  })

  it('badge 非空时应渲染推荐标签', () => {
    const wrapper = mount(PricingCard, {
      props: featuredProps,
    })

    expect(wrapper.find('.pricing-badge').exists()).toBe(true)
    expect(wrapper.find('.pricing-badge').text()).toBe('最受欢迎')
  })

  it('badge 为空字符串时不应渲染推荐标签', () => {
    const wrapper = mount(PricingCard, {
      props: normalProps,
    })

    expect(wrapper.find('.pricing-badge').exists()).toBe(false)
  })

  it('CTA 按钮应显示传入的文字', () => {
    const wrapper = mount(PricingCard, {
      props: normalProps,
    })

    expect(wrapper.find('.btn-primary').text()).toBe('立即开始')
  })
})
