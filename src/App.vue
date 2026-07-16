<!--
  App.vue — 应用根组件
  ============================================================
  职责：
  - 定义所有页面数据（features / steps / stats / pricing / logos）
  - 组合所有子组件
  - onMounted 时初始化 composable 驱动的交互行为
  - 数据通过 props 向下传递，实现数据与视图分离

  组件树：
  App.vue
  ├── <SkipLink />
  ├── <AppNav />
  ├── <main> (锚点 #main-content)
  │   ├── Hero 区
  │   │   ├── <GradientMesh />
  │   │   ├── 标题 / 副标题 / CTA 按钮
  │   │   └── <TerminalTypewriter />
  │   ├── Features 区
  │   │   └── <FeatureCard /> × 6
  │   ├── How It Works 区
  │   │   └── <WorkStep /> × 3
  │   ├── Stats 区
  │   │   └── <StatItem /> × 4
  │   ├── Pricing 区
  │   │   └── <PricingCard /> × 3
  │   ├── Trusted By 区（Logo 墙，纯模板）
  │   ├── FAQ 区（折叠面板，手风琴模式）
  │   └── CTA 区（底部转化，纯模板）
  ├── <AppFooter />
  ├── <BackToTop />
  ├── <TweaksPanel />
  └── <NoiseOverlay />
  ============================================================
-->
<template>
  <!-- 无障碍跳过链接 -->
  <SkipLink />

  <!-- 固定顶部导航 -->
  <AppNav />

  <!--
    主内容区
    id="main-content" 是 SkipLink 的目标锚点
  -->
  <main id="main-content">
    <!-- ====================================================
         HERO 区
         渐变网格背景 + 价值主张 + CTA + 终端打字机
         ==================================================== -->
    <section class="hero" id="hero">
      <!-- 渐变网格背景（纯装饰，aria-hidden） -->
      <GradientMesh />

      <!-- 状态标签 -->
      <div class="hero-badge">
        <span class="hero-badge-dot"></span> Nexus v2 正式发布 — 公开测试中
      </div>

      <!-- 主标题：渐变文字强调"懂你代码" -->
      <h1>用真正<em>懂你代码</em>的<br />AI 来构建。</h1>

      <!-- 副标题：一句话价值主张 -->
      <p class="hero-sub">
        Nexus 索引你的整个代码库，跨文件、跨语言、跨框架提供上下文感知的智能辅助——
        不只是自动补全，而是深层的架构级理解。
      </p>

      <!-- CTA 双按钮 -->
      <div class="hero-actions">
        <button class="btn-primary">免费开始使用</button>
        <button class="btn-secondary">阅读文档 →</button>
      </div>

      <!-- 终端打字机（useTypewriter composable 驱动） -->
      <TerminalTypewriter />
    </section>

    <!-- ====================================================
         FEATURES 区
         6 张功能卡片，鼠标悬浮光晕跟随
         ==================================================== -->
    <section class="section features container" id="features">
      <p class="section-label reveal">平台能力</p>
      <h2 class="section-title reveal">
        自信交付，<br />所需的一切都在这里。
      </h2>
      <p class="section-desc reveal" style="margin: 0 auto">
        从代码理解到自动审查——一个平台，完全适配你的团队已有的工作方式。
      </p>

      <div class="features-grid reveal">
        <FeatureCard
          v-for="(item, i) in features"
          :key="i"
          :icon="item.icon"
          :title="item.title"
          :description="item.description"
        />
      </div>
    </section>

    <!-- ====================================================
         HOW IT WORKS 区
         3 步流程，带连接线和数字编号
         ==================================================== -->
    <section class="section how-it-works container" id="how-it-works">
      <p class="section-label reveal">工作原理</p>
      <h2 class="section-title reveal">
        三步，从代码<br />到信心。
      </h2>
      <div class="steps reveal">
        <WorkStep
          v-for="(step, i) in steps"
          :key="i"
          :number="step.number"
          :title="step.title"
          :description="step.description"
        />
      </div>
    </section>

    <!-- ====================================================
         STATS 区
         4 个数据统计，进入视口时触发计数动画
         ==================================================== -->
    <section class="section stats-section container" id="stats">
      <p class="section-label reveal">数据说话</p>
      <h2 class="section-title reveal">
        每天交付的团队<br />都在用 Nexus。
      </h2>
      <div ref="statsGrid" class="stats-grid reveal">
        <StatItem
          v-for="(stat, i) in statsData"
          :key="i"
          :count="stat.count"
          :suffix="stat.suffix"
          :label="stat.label"
        />
      </div>
    </section>

    <!-- ====================================================
         PRICING 区
         3 档定价卡片，中间为推荐高亮
         ==================================================== -->
    <section class="section pricing container" id="pricing">
      <p class="section-label reveal">定价</p>
      <h2 class="section-title reveal">
        免费起步。随团队<br />规模灵活扩展。
      </h2>
      <p class="section-desc reveal" style="margin: 0 auto">
        所有套餐均包含无限仓库和 SOC 2 合规基础设施。
      </p>

      <!-- 月付/年付切换 -->
      <div class="billing-toggle reveal">
        <span :class="{ active: !isYearly }">月付</span>
        <button
          class="toggle-switch"
          :class="{ yearly: isYearly }"
          @click="isYearly = !isYearly"
          :aria-label="isYearly ? '切换为月付' : '切换为年付'"
          role="switch"
          :aria-checked="isYearly"
        >
          <span class="toggle-thumb"></span>
        </button>
        <span :class="{ active: isYearly }">
          年付
          <span class="save-chip">省 20%</span>
        </span>
      </div>

      <div class="pricing-grid reveal">
        <PricingCard
          v-for="(plan, i) in computedPlans"
          :key="i"
          :name="plan.name"
          :price="plan.price"
          :period="plan.period"
          :features="plan.features"
          :cta="plan.cta"
          :badge="plan.badge"
          :featured="plan.featured"
        />
      </div>
    </section>

    <!-- ====================================================
         TRUSTED BY 区（Logo 墙）
         7 个中国科技公司名称，半透明展示
         ==================================================== -->
    <section class="section trusted container" id="trusted">
      <p class="section-label reveal">深受信赖</p>
      <h2 class="section-title reveal">
        全球顶尖公司的<br />团队都在用 Nexus 构建。
      </h2>
      <div class="logo-wall reveal">
        <span v-for="(name, i) in logos" :key="i" class="logo-wall-item">{{ name }}</span>
      </div>
    </section>

    <!-- ====================================================
         FAQ 区
         折叠面板，手风琴模式（同时只展开一项）
         ==================================================== -->
    <section class="section faq container" id="faq">
      <p class="section-label reveal">常见问题</p>
      <h2 class="section-title reveal">
        还有疑问？<br />这里都有答案。
      </h2>
      <div class="reveal">
        <FaqAccordion :faqs="faqs" />
      </div>
    </section>

    <!-- ====================================================
         CTA 区（底部转化）
         金色光晕背景 + 大白标题 + CTA 按钮
         ==================================================== -->
    <section class="section cta-section container" id="cta">
      <div class="cta-card reveal">
        <h2>准备好用 AI 构建了吗？</h2>
        <p>加入数千个已经用 Nexus 加速交付的团队。前 3 个仓库永久免费。</p>
        <button class="btn-primary">免费开始使用</button>
      </div>
    </section>
  </main>

  <!-- 页脚 -->
  <AppFooter />

  <!-- 返回顶部浮动按钮 -->
  <BackToTop />

  <!-- 调节面板（主题 / 密度 / 动效） -->
  <TweaksPanel />

  <!-- 全局噪点纹理叠加层 -->
  <NoiseOverlay />
</template>

<script setup lang="ts">
/**
 * App.vue 脚本逻辑（TypeScript）
 * ============================================================
 * - 接口定义：FeatureItem / StepItem / StatItem / PlanItem / FaqItem
 * - 数据定义：features / steps / statsData / plans / logos / faqs
 * - 响应式：isYearly → computedPlans（年付 8 折）
 * - onMounted 初始化：滚动揭示 + 鼠标光晕 + 计数动画 + 锚点滚动
 */

import { ref, computed, onMounted } from 'vue'

// ── 类型定义 ─────────────────────────────────────────────────

/** 功能卡片数据 */
interface FeatureItem {
  icon: string
  title: string
  description: string
}

/** 工作流程步骤数据 */
interface StepItem {
  number: string
  title: string
  description: string
}

/** 统计数据项 */
interface StatItemData {
  count: string
  suffix: string
  label: string
}

/** 定价方案数据 */
interface PlanItem {
  name: string
  price: string
  period: string
  features: string[]
  cta: string
  badge: string
  featured: boolean
}

/** FAQ 条目 */
interface FaqItem {
  q: string
  a: string
}

// ── 子组件导入 ──────────────────────────────────────────────
import SkipLink from './components/SkipLink.vue'
import AppNav from './components/AppNav.vue'
import GradientMesh from './components/GradientMesh.vue'
import TerminalTypewriter from './components/TerminalTypewriter.vue'
import FeatureCard from './components/FeatureCard.vue'
import WorkStep from './components/WorkStep.vue'
import StatItem from './components/StatItem.vue'
import PricingCard from './components/PricingCard.vue'
import FaqAccordion from './components/FaqAccordion.vue'
import AppFooter from './components/AppFooter.vue'
import BackToTop from './components/BackToTop.vue'
import TweaksPanel from './components/TweaksPanel.vue'
import NoiseOverlay from './components/NoiseOverlay.vue'

// ── Composables ──────────────────────────────────────────────
import { useScrollReveal } from './composables/useScrollReveal'
import { useMouseGlow } from './composables/useMouseGlow'
import { useCountUp } from './composables/useCountUp'

// ============================================================
// PAGE DATA — 所有页面内容在这里集中定义
// 修改文案只需编辑这些数组，组件自动更新
// ============================================================

/** Feature 卡片数据（6 张） */
const features: FeatureItem[] = [
  {
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    title: '深度代码图谱',
    description: 'Nexus 为你的整个代码库构建语义图谱——理解类型、导入关系、调用链路和架构决策。',
  },
  {
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    title: '跨文件重构',
    description: '用自然语言描述改动，Nexus 自动规划、执行并验证跨几十个文件的修改——附带可审查的 Diff。',
  },
  {
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>',
    title: '自动化代码审查',
    description: '每个 PR 都获得上下文感知的深度审查——捕获 Linter 发现不了的 Bug、反模式和安全隐患。',
  },
  {
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    title: '即时部署预览',
    description: '推送分支即可获得实时预览。Nexus 在秒级内启动你的完整技术栈——前端、后端、数据库。',
  },
  {
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
    title: '团队知识图谱',
    description: '每一次决策、每一次讨论、每一次审查都会沉淀为可搜索的知识库——团队不再重复相同的对话。',
  },
  {
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
    title: '安全私有',
    description: '你的代码永不离开你的基础设施。Nexus 支持本地部署或 VPC 内部署，SOC 2 Type II 认证，零数据留存。',
  },
]

/** 工作流程步骤数据（3 步） */
const steps: StepItem[] = [
  {
    number: '01',
    title: '连接你的仓库',
    description: '在 60 秒内链接 GitHub、GitLab 或 Bitbucket。Nexus 自动克隆并索引所有内容。',
  },
  {
    number: '02',
    title: 'AI 学习你的技术栈',
    description: 'Nexus 构建你的架构、依赖关系和团队规范的深层语义模型——不只是 Token 预测。',
  },
  {
    number: '03',
    title: '自信交付',
    description: '获得上下文感知的代码生成、跨文件重构和自动化 PR 审查，捕获团队可能遗漏的问题。',
  },
]

/** 统计数据（4 项） */
const statsData: StatItemData[] = [
  { count: '12800', suffix: '+', label: '活跃团队' },
  { count: '3200000', suffix: '', label: 'PR 已审查' },
  { count: '47', suffix: '%', label: '合并速度提升' },
  { count: '99.99', suffix: '%', label: '运行可用性' },
]

/** 定价方案数据（3 档） */
const plans: PlanItem[] = [
  {
    name: '入门版',
    price: '免费',
    period: '适合个人及小型项目',
    features: [
      '最多 3 个仓库',
      '100 次 AI 交互 / 月',
      '代码审查 & 自动补全',
      '社区支持',
    ],
    cta: '立即开始',
    badge: '',
    featured: false,
  },
  {
    name: '专业版',
    price: '¥199',
    period: '每人 / 月',
    features: [
      '无限仓库',
      '无限 AI 交互次数',
      '跨文件重构',
      '团队知识图谱',
      '部署预览',
      '优先支持',
    ],
    cta: '免费试用',
    badge: '最受欢迎',
    featured: true,
  },
  {
    name: '企业版',
    price: '定制',
    period: '为规模化组织打造',
    features: [
      '专业版全部功能',
      '本地 / VPC 部署',
      'SSO & SCIM 配置',
      '定制 AI 模型微调',
      '专属支持工程师',
      '99.99% SLA',
    ],
    cta: '联系销售',
    badge: '',
    featured: false,
  },
]

/** Logo 墙公司名称 */
const logos: string[] = [
  '字节跳动', '美团', '小红书', '蔚来汽车',
  '大疆创新', '米哈游', 'PingCAP',
]

// ── 定价切换 ─────────────────────────────────────────────────

/** 年付开关状态 */
const isYearly = ref<boolean>(false)

/** 根据月付/年付动态计算定价数据（年付 8 折） */
const computedPlans = computed<PlanItem[]>(() => {
  return plans.map((plan) => {
    if (plan.price === '免费' || plan.price === '定制') return { ...plan }

    const monthlyPrice = parseInt(plan.price.replace('¥', ''), 10)
    const yearlyPrice = Math.round((monthlyPrice * 12 * 0.8) / 12)

    return {
      ...plan,
      price: isYearly.value ? `¥${yearlyPrice}` : plan.price,
      period: isYearly.value ? '每人 / 月（按年付费）' : plan.period,
      badge: isYearly.value ? '省 20%' : plan.badge,
      featured: plan.featured,
    }
  })
})

/** FAQ 数据 */
const faqs: FaqItem[] = [
  {
    q: 'Nexus 支持哪些编程语言？',
    a: 'Nexus 支持所有主流语言，包括 JavaScript/TypeScript、Python、Go、Rust、Java、C/C++、Ruby 等。我们的语义分析引擎会针对每种语言进行深度优化，理解其特有的类型系统和模块机制。',
  },
  {
    q: '我的代码安全吗？数据会离开我的服务器吗？',
    a: '绝对安全。Nexus 支持本地部署和 VPC 内部署，你的代码永远不会离开你的基础设施。我们已通过 SOC 2 Type II 认证，所有数据传输均采用端到端加密。你也可以选择零数据留存模式。',
  },
  {
    q: '免费版有什么限制？',
    a: '免费版支持最多 3 个仓库和每月 100 次 AI 交互，包含代码审查和自动补全功能。对于个人项目和小型团队来说完全够用。升级专业版即可解锁无限仓库和无限交互次数。',
  },
  {
    q: '可以和现有的 CI/CD 流程集成吗？',
    a: '可以。Nexus 提供原生 GitHub Actions、GitLab CI 和 Bitbucket Pipelines 集成。只需在 workflow 文件中添加一行配置，PR 审查和代码分析就会自动运行。',
  },
  {
    q: '从注册到实际使用需要多长时间？',
    a: '60 秒。连接你的 Git 仓库后，Nexus 会自动克隆、索引并构建语义图谱。小型仓库（< 1000 文件）通常在 30 秒内完成索引，大型 monorepo 也只需几分钟。',
  },
]

// ============================================================
// COMPOSABLE REFS — 用于 composable 观察的模板 ref
// ============================================================

/** Stats 区容器 ref（useCountUp 观察进入视口） */
const statsGrid = ref<HTMLElement | null>(null)

// ============================================================
// LIFECYCLE — onMounted 初始化所有交互行为
// ============================================================

onMounted(() => {
  // 1. 滚动揭示动画 — 扫描所有 .reveal 元素，进入视口时淡入
  const { refresh: revealRefresh } = useScrollReveal()
  revealRefresh()

  // 2. 鼠标跟随光晕 — 扫描所有 [data-glow] 卡片，绑定 mousemove 追踪
  const { apply: glowApply } = useMouseGlow()
  glowApply()

  // 3. 数字计数动画 — 观察 stats 区容器，进入视口时触发计数
  const { observe: countUpObserve } = useCountUp()
  countUpObserve(statsGrid)

  // 4. 锚点平滑滚动 — 拦截 # 链接，使用 window.scrollTo 代替原生 scrollIntoView
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href')
      if (!id) return
      const target = document.querySelector(id)
      if (target) {
        e.preventDefault()
        const top = target.getBoundingClientRect().top + window.pageYOffset - 72
        window.scrollTo({ top, behavior: 'smooth' })
      }
    })
  })
})
</script>

<style scoped>
/* ================================================================
   APP-LEVEL LAYOUT STYLES
   仅包含页面级布局样式，组件内部样式各自 scoped
   ================================================================ */

/* ── HERO 区 ─────────────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 140px 40px 100px;
  text-align: center;
  overflow: hidden;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 18px;
  border-radius: 999px;
  border: 1px solid var(--hairline);
  background: var(--surface-1);
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 32px;
  position: relative;
  z-index: 1;
  animation: fadeInUp 800ms var(--ease-out) both;
}

.hero-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #34d399;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(48px, 7vw, 84px);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.06;
  max-width: 820px;
  position: relative;
  z-index: 1;
  animation: fadeInUp 800ms var(--ease-out) 100ms both;
}

.hero h1 em {
  font-style: normal;
  /* 三色渐变：青 → 金 → 琥珀 */
  background: linear-gradient(
    135deg,
    var(--mesh-teal) 0%,
    var(--mesh-gold) 50%,
    var(--mesh-amber) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-sub {
  margin-top: 28px;
  max-width: 560px;
  font-size: 17px;
  color: var(--text-secondary);
  line-height: 1.65;
  position: relative;
  z-index: 1;
  animation: fadeInUp 800ms var(--ease-out) 200ms both;
}

.hero-actions {
  margin-top: 40px;
  display: flex;
  gap: 14px;
  position: relative;
  z-index: 1;
  animation: fadeInUp 800ms var(--ease-out) 300ms both;
}

/* ── FEATURES 区 ─────────────────────────────────────────── */
.features {
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  margin-top: 72px;
  background: var(--hairline);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-lg);
  overflow: hidden;
  text-align: left;
}

/* ── HOW IT WORKS 区 ─────────────────────────────────────── */
.how-it-works {
  text-align: center;
}

.steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  margin-top: 72px;
  position: relative;
}

/* 步骤间连接线（桌面端可见） */
.steps::before {
  content: '';
  position: absolute;
  top: 72px;
  left: 20%;
  right: 20%;
  height: 1px;
  background: var(--hairline);
  z-index: 0;
}

/* ── STATS 区 ────────────────────────────────────────────── */
.stats-section {
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--hairline);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-top: 56px;
}

/* ── PRICING 区 ──────────────────────────────────────────── */
.pricing {
  text-align: center;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 64px;
  align-items: start;
}

/* ── 月付/年付切换 ─────────────────────────────────────── */
.billing-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-muted);
}

.billing-toggle > span {
  transition: color 200ms var(--ease-out);
}

.billing-toggle > span.active {
  color: var(--text-primary);
}

/* 省XX% 标签 */
.save-chip {
  display: inline-block;
  margin-left: 6px;
  padding: 1px 8px;
  border-radius: 999px;
  background: rgba(232, 135, 10, 0.15);
  color: var(--mesh-gold);
  font-size: 11px;
  font-weight: 600;
}

/* ── 切换滑块 ─────────────────────────────────────────── */
.toggle-switch {
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: var(--surface-3);
  border: 1px solid var(--hairline);
  cursor: pointer;
  transition: background 250ms var(--ease-out), border-color 250ms var(--ease-out);
  flex-shrink: 0;
}

.toggle-switch.yearly {
  background: rgba(232, 135, 10, 0.25);
  border-color: var(--mesh-gold);
}

/* 滑块圆点 */
.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--text-primary);
  transition: transform 250ms var(--ease-spring);
}

.toggle-switch.yearly .toggle-thumb {
  transform: translateX(20px);
  background: var(--mesh-gold);
}

/* ── FAQ 区 ─────────────────────────────────────────────── */
.faq {
  text-align: center;
}

/* ── LOGO WALL ───────────────────────────────────────────── */
.trusted {
  text-align: center;
}

.logo-wall {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 48px 64px;
  margin-top: 48px;
}

.logo-wall-item {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: -0.01em;
  opacity: 0.45;
  transition: opacity 300ms var(--ease-out);
  cursor: default;
}

.logo-wall-item:hover {
  opacity: 0.75;
}

/* ── CTA 底部转化 ────────────────────────────────────────── */
.cta-section {
  text-align: center;
}

.cta-card {
  background: var(--surface-1);
  border: 1px solid var(--hairline);
  border-radius: var(--radius-xl);
  padding: 80px 48px;
  position: relative;
  overflow: hidden;
}

/* 金色光晕背景 */
.cta-card::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--mesh-gold), transparent 70%);
  filter: blur(120px);
  opacity: 0.1;
  top: -30%;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.cta-card h2 {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.cta-card p {
  color: var(--text-secondary);
  margin-bottom: 36px;
  position: relative;
  z-index: 1;
  font-size: 16px;
}

.cta-card .btn-primary {
  position: relative;
  z-index: 1;
}

/* ================================================================
   RESPONSIVE
   ================================================================ */

/* ── 平板（≤960px）：2 列布局 ────────────────────────────── */
@media (max-width: 960px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .steps {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .steps::before {
    display: none; /* 移动端不显示连接线 */
  }

  .pricing-grid {
    grid-template-columns: 1fr;
    max-width: 420px;
    margin-left: auto;
    margin-right: auto;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero {
    padding: 120px 24px 80px;
  }
}

/* ── 手机（≤600px）：单列 ────────────────────────────────── */
@media (max-width: 600px) {
  .features-grid {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    font-size: 36px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .cta-card {
    padding: 48px 24px;
  }

  .cta-card h2 {
    font-size: 28px;
  }

  .logo-wall {
    gap: 24px 32px;
  }
}
</style>
