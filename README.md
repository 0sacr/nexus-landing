# Nexus Landing

> AI 产品落地页 — Vue 3 + TypeScript 全栈前端工程实践

一个从设计令牌系统、组件化架构、到静态类型检查和自动化测试的完整前端项目。设计风格融合 **Linear** 的暖黑克制与 **Vercel** 的渐变网格，适合作为 SaaS/AI 产品官网的工程参考。

**在线预览**：https://nexus-landing.vercel.app（部署后填入）

---

## 技术栈

| 类别 | 选型 |
|---|---|
| 框架 | Vue 3.4（Composition API + `<script setup>`） |
| 类型系统 | TypeScript 5.4（`strict: true`，零 `any`） |
| 构建 | Vite 5 |
| 代码规范 | ESLint 9 + Prettier 3 |
| 类型检查 | `vue-tsc --noEmit` |
| 测试 | Vitest + Vue Test Utils |
| 部署 | Vercel（零配置） |

---

## 项目架构

```
nexus-landing/
├── index.html                          # Vite 入口
├── vite.config.ts                      # Vite 配置（别名 @/ → src/）
├── tsconfig.json                       # TS 严格模式配置
├── eslint.config.js                    # ESLint flat config
├── .prettierrc                         # Prettier 格式化规则
│
├── src/
│   ├── main.ts                         # createApp 入口
│   ├── App.vue                         # 根组件（数据定义 + 页面布局 + 响应式）
│   │
│   ├── assets/styles/
│   │   └── design-tokens.css           # 40+ CSS 自定义属性（暖/冷双主题）
│   │
│   ├── components/                     # 13 个 Vue SFC 组件
│   │   ├── AppNav.vue                  # 固定导航 + 移动端汉堡菜单 + 侧滑面板
│   │   ├── SkipLink.vue                # 无障碍"跳到内容"链接
│   │   ├── GradientMesh.vue            # Hero 渐变网格 + 鼠标视差
│   │   ├── TerminalTypewriter.vue      # 终端逐字打印动画
│   │   ├── FeatureCard.vue             # 功能卡片（鼠标跟随光晕）
│   │   ├── WorkStep.vue                # 工作流程步骤
│   │   ├── StatItem.vue                # 统计数字（滚动计数动画）
│   │   ├── PricingCard.vue             # 定价卡片（高亮推荐）
│   │   ├── FaqAccordion.vue            # FAQ 折叠面板（Transition 动画）
│   │   ├── AppFooter.vue               # 页脚
│   │   ├── BackToTop.vue               # 返回顶部浮动按钮
│   │   ├── TweaksPanel.vue             # 实时调节面板（主题/密度/动效）
│   │   └── NoiseOverlay.vue            # SVG feTurbulence 噪点纹理
│   │
│   └── composables/                    # 4 个可复用逻辑函数
│       ├── useTypewriter.ts            # 逐字打印（setTimeout 递归）
│       ├── useCountUp.ts               # 数字滚动（RAF + quint ease-out）
│       ├── useScrollReveal.ts          # IntersectionObserver 滚动揭示
│       └── useMouseGlow.ts             # 卡片鼠标跟随光晕
```

---

## 组件树

```
App.vue
├── <SkipLink />
├── <AppNav />
├── <main>
│   ├── <GradientMesh />                    # Hero 背景
│   ├── <TerminalTypewriter />             # 打字机
│   ├── <FeatureCard /> × 6                # 功能卡片
│   ├── <WorkStep /> × 3                   # 工作步骤
│   ├── <StatItem /> × 4                   # 统计数字
│   ├── <PricingCard /> × 3               # 定价方案（含月付/年付切换）
│   ├── <FaqAccordion />                   # 常见问题
│   └── Logo 墙 + CTA 转化
├── <AppFooter />
├── <BackToTop />
├── <TweaksPanel />                        # 调节面板
└── <NoiseOverlay />                       # 全局噪点
```

---

## 数据流

```
App.vue（唯一数据源 — 5 个 typed 数组 + 3 个 composable ref）
   │
   ├── props ───→ FeatureCard / WorkStep / StatItem / PricingCard / FaqAccordion
   │
   ├── provide/inject ──→ tweaks（主题 / 密度 / 动效）
   │                       ↓
   │                  全局 CSS 变量实时切换
   │
   └── composables ──→ useTypewriter / useCountUp / useScrollReveal / useMouseGlow
                        ↓
                   ref + onMounted / onUnmounted 生命周期管理
```

---

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器（http://localhost:3000）
npm run dev

# 类型检查
npm run typecheck

# 代码检查
npm run lint

# 自动格式化
npm run format

# 运行测试
npm run test

# 生产构建
npm run build
```

---

## 设计系统

> 详细令牌定义见 [design-tokens.css](src/assets/styles/design-tokens.css)

| 令牌层级 | 说明 |
|---|---|
| 4 级背景色 | `#08090A` → `#0F0F11` → `#16171C` → `#1E1F25` |
| 3 级文字色 | Primary `#F7F8F8` / Secondary `#A1A1AA` / Muted `#71717A` |
| 4 色渐变网格 | 青 → 玫红 → 琥珀 → 金 |
| 字体 | Inter Tight（标题）/ Inter（正文）/ JetBrains Mono（代码）/ Noto Sans SC（中文） |
| 圆角系统 | 8 / 12 / 16 / 24px |
| 双主题 | `data-theme="warm"`（暖色默认）/ `"cool"`（冷色 Vercel 风格） |

---

## License

MIT
