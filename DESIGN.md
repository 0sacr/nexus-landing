# Nexus Landing — 设计文档

> 完整设计系统说明，涵盖视觉语言、交互模式、组件架构和工程实践。
>
> 最后更新：2026-07-16

---

## 目录

1. [设计哲学](#1-设计哲学)
2. [色彩系统](#2-色彩系统)
3. [字体系统](#3-字体系统)
4. [间距与圆角](#4-间距与圆角)
5. [动效系统](#5-动效系统)
6. [页面结构](#6-页面结构)
7. [组件设计](#7-组件设计)
8. [交互设计](#8-交互设计)
9. [响应式策略](#9-响应式策略)
10. [无障碍设计](#10-无障碍设计)
11. [设计灵感来源](#11-设计灵感来源)

---

## 1. 设计哲学

### 核心理念：**"克制中的张力"**

页面追求的不是浮夸，而是用**极简骨架 + 精心编排的亮点**制造高级感：

- **90% 克制的暗色表面** — 暖黑底色（`#08090A`）搭配半透明分割线，让内容自然分层
- **10% 精心编排的亮点** — 只在关键触点使用金色和渐变：主标题渐变文字、鼠标跟随光晕、CTA 底部光晕

### 设计调性

| 维度 | 取值 | 说明 |
|---|---|---|
| 视觉温度 | **暖暗** | 底色偏暖而非纯黑，避免冰冷感 |
| 信息密度 | **中等偏低** | 大量留白，每个视图焦点不超过 3 个 |
| 动效强度 | **克制** | 动画少但精，不带攻击性 |
| 品牌调性 | **开发者工具** | 理性、专业、信任感，而非营销感 |

### 设计原则

1. **少即是多** — 每个元素必须为"如果删掉会变差"辩护
2. **材质感优先** — 用噪点纹理、微妙的层级差代替纯色平面
3. **动效有因** — 每个动画有明确目的：引导注意力 / 提供反馈 / 建立空间关系
4. **代码即设计** — 设计令牌集中管理，组件与样式解耦，不写一次性样式

---

## 2. 色彩系统

### 核心色板

```
暖黑底色   #08090A  ██████████████████████  页面背景，非纯黑，含微量暖色
一级面板   #0F0F11  ██████████████████████  卡片、终端外壳
二级面板   #16171C  ██████████████████████  高亮卡片背景
三级面板   #1E1F25  ██████████████████████  悬浮态、图标容器
```

### 文字层级

```
主文字    #F7F8F8  ── 标题、正文
次要文字  #A1A1AA  ── 描述、辅助说明
占位文字  #71717A  ── 弱化信息、水印
```

主文字不是纯白（`#FFFFFF`），而是带极微量暖色的 `#F7F8F8`，在暗底上阅读更舒适。

### 强调色

```
琥珀金    #E8870A  ── 主强调色（焦点环、标签、渐变）
金色      #C88A3A  ── 辅助强调（光晕、图标）
青色      #007A8B  ── 渐变网格色
玫红      #D9466C  ── 渐变网格色
```

强调色遵循"单主色 + 辅助色"策略：
- **琥珀金**是唯一的品牌色，所有可交互元素统一使用
- 青色和玫红**不参与 UI**，只出现在 Hero 区渐变网格背景中

### 分割线

```
hairline       rgba(255,255,255, 0.07)  ── 1px 半透明白边
hairline-hover rgba(255,255,255, 0.14)  ── 悬浮态加强
```

使用半透明白色而非灰色实线——在任何背景色上都能自然融合，不像 `#333` 那样死板。

### CTA 按钮

```
白底黑字  bg:#FFFFFF text:#08090A  ── 主按钮
透明+边框  bg:transparent border:hairline  ── 次按钮
```

主按钮白底黑字是高反差策略：在全暗页面中，唯一纯白元素就是 CTA，视觉权重最高。

---

## 3. 字体系统

| 角色 | 字体 | 用途 |
|---|---|---|
| **Display** | Inter Tight + Noto Sans SC | 标题（Hero / Section / CTA） |
| **Body** | Inter + Noto Sans SC | 正文、描述、按钮 |
| **Mono** | JetBrains Mono | 代码、终端、标签 |

### 字体选择理由

- **Inter Tight** — Inter 的紧凑变体，更窄的字间距让大字标题更有力度
- **Inter** — 业界公认的 UI 正文字体，可读性极佳
- **Noto Sans SC** — 中文字符回退，与 Inter 字重和节奏匹配良好
- **JetBrains Mono** — 开发者熟悉的等宽字体，终端和代码片段看起来很"原生"

### 字号层级

```
84px (Hero 桌面)     ── 主标题
48px (Section)       ── 区块标题
40px (CTA)           ── 底部转化标题
20px                 ── 定价卡套餐名
17px                 ── 功能卡标题
15px (base)          ── 正文
14px                 ── 描述文字
13px                 ── 终端代码
11px                 ── 区块标签（全大写）
```

全部使用 `clamp()` 做流体字号，如 `clamp(48px, 7vw, 84px)`，在不同屏幕上平滑过渡。

### 字间距

```
-0.035em  ── Hero 主标题（极紧凑，冲击力）
-0.025em  ── Section 标题
-0.015em  ── 卡片标题
-0.01em   ── 按钮
0.1em     ── 区块标签（全大写，需要松散间距）
```

---

## 4. 间距与圆角

### 间距系统

| Token | 值 | 用途 |
|---|---|---|
| `--content-max` | 1120px | 内容最大宽度 |
| `--section-gap` | 120px | 区块上下间距（桌面） |

- 区块间距桌面 120px，平板 80px
- 容器内边距桌面 40px，平板 24px
- 组件间距使用 Grid `gap` 而非硬编码 margin

### 圆角策略（Linear 风格：克制，≤16px）

| Token | 值 | 用途 |
|---|---|---|
| `--radius-sm` | 8px | 按钮、图标容器 |
| `--radius-md` | 12px | 终端窗口 |
| `--radius-lg` | 16px | 卡片、Grid 容器 |
| `--radius-xl` | 24px | CTA 大卡 |

圆角规则：**组件越小，圆角越小**；**容器越大，圆角越大**。不使用超过 24px 的圆角，避免"软糖"感觉。

---

## 5. 动效系统

### 缓动曲线

```css
--ease-out:    cubic-bezier(0.16, 1, 0.3, 1);   /* 标准缓出：快进慢停 */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* 弹性：轻微过冲回弹 */
```

两条曲线，不滥用。`ease-out` 用于大部分过渡，`ease-spring` 仅用于切换滑块。

### 动画分类

#### A. 入场动画（页面加载时）

| 元素 | 动画 | 时长 | 延迟 |
|---|---|---|---|
| Hero 状态标签 | fadeInUp | 800ms | 0ms |
| Hero 标题 | fadeInUp | 800ms | 100ms |
| Hero 副标题 | fadeInUp | 800ms | 200ms |
| Hero CTA 按钮 | fadeInUp | 800ms | 300ms |
| 终端窗口 | fadeInUp | 800ms | 400ms |

使用**错位延迟**（staggered delay）制造层叠进场感，而非一次性全弹出。

#### B. 滚动揭示动画（`useScrollReveal`）

```
.reveal { opacity: 0; transform: translateY(32px); }
.reveal.visible { opacity: 1; transform: translateY(0); }
transition: 700ms ease-out
```

- 触发条件：元素 12% 进入视口
- 每个元素只触发一次
- 适用于：所有内容区块（Features / How It Works / Stats / Pricing / FAQ / CTA）

#### C. 持续动画

| 动画 | 元素 | 参数 |
|---|---|---|
| `meshDrift` | Hero 渐变网格 blob | 22~30s ease-in-out infinite alternate |
| `cursorBlink` | 终端打字机光标 | 1s step-end infinite |
| `fadeInUp` | 各入场元素 | 800ms ease-out |

#### D. 交互动画

| 交互 | 效果 | 参数 |
|---|---|---|
| 卡片 hover | 光晕浮现 + 背景微亮 | 300~400ms ease-out |
| 按钮 hover | scale(1.03) | 200ms ease-out |
| 按钮 active | scale(0.98) | 200ms ease-out |
| 定价切换 | 滑块弹性滑动 | 250ms ease-spring |
| 鼠标移动 | 渐变网格视差 | RAF lerp 0.08 |
| FAQ 展开 | max-height + opacity | 350ms ease-out |

### 动效关闭

```
1. @media (prefers-reduced-motion: reduce)  → 动画时长强制 0.01ms
2. html[data-motion="off"]                   → animation paused + transition 0.01ms
```

双重保障：系统级 + 用户手动关闭。

---

## 6. 页面结构

### 整体布局：单页纵向滚动

```
┌────────────────────────────────────────────┐
│  AppNav (固定顶部)                          │
├────────────────────────────────────────────┤
│  HERO                                      │
│  ├─ GradientMesh (背景动画)                 │
│  ├─ 状态标签                                │
│  ├─ 主标题（渐变文字）                       │
│  ├─ 副标题                                  │
│  ├─ CTA 双按钮                              │
│  └─ TerminalTypewriter (终端打字机)          │
├────────────────────────────────────────────┤
│  FEATURES (6 张功能卡片)                     │
│  3×2 Grid → 2×3 → 1×6                      │
├────────────────────────────────────────────┤
│  HOW IT WORKS (3 步流程)                     │
│  3×1 → 1×3，带连接线                         │
├────────────────────────────────────────────┤
│  STATS (4 个统计数字)                        │
│  4×1 → 2×2                                  │
├────────────────────────────────────────────┤
│  PRICING (3 档定价 + 月/年切换)              │
│  3×1 → 1×3                                  │
├────────────────────────────────────────────┤
│  TRUSTED BY (Logo 墙)                        │
│  7 个公司名，flex wrap                       │
├────────────────────────────────────────────┤
│  FAQ (5 条手风琴折叠)                        │
├────────────────────────────────────────────┤
│  CTA (底部转化，金色光晕背景)                 │
├────────────────────────────────────────────┤
│  AppFooter                                  │
├────────────────────────────────────────────┤
│  浮层：BackToTop + TweaksPanel + NoiseOverlay│
└────────────────────────────────────────────┘
```

### 区块标签模式

每个区块使用统一的信息层级：

```
[11px 全大写金色 Mono 标签]
[clamp(30px, 4vw, 48px) Display 加粗标题]
[16px 灰色描述文字，max-width 520px]
[内容区域]
```

这种"标签 → 大标题 → 描述"的三段式结构贯穿全页，建立阅读节奏。

---

## 7. 组件设计

### 7.1 Hero 区

#### GradientMesh（渐变网格背景）

```
4 个超大模糊圆 blob 叠加：
┌──────────────┬──────────┬──────────┬────────────┐
│ 颜色          │ 尺寸      │ 位置      │ 视差系数    │
├──────────────┼──────────┼──────────┼────────────┤
│ 青 #007A8B   │ 700px    │ 左上      │ 0.6 (浅)   │
│ 玫红 #D9466C │ 550px    │ 右上      │ 1.0 (中)   │
│ 琥珀 #E8870A │ 500px    │ 左下      │ 0.8 (中)   │
│ 金 #C88A3A   │ 400px    │ 中心      │ 1.2 (深)   │
└──────────────┴──────────┴──────────┴────────────┘

双层运动：
- CSS @keyframes meshDrift：24s 周期自动漂移 + 缩放
- 鼠标视差：RAF lerp 叠加 0~±30px 偏移
```

#### 标题渐变

主标题中 `<em>懂你代码</em>` 使用三色渐变裁切：

```
background: linear-gradient(135deg, 青 → 金 → 琥珀)
-webkit-background-clip: text
```

渐变角度 135° 是从左上到右下的对角线，与网格 blob 的运动方向呼应。

### 7.2 FeatureCard（功能卡片）

```
┌──────────────────────────┐
│  [icon] 36×36 金描边      │
│                          │
│  深度代码图谱              │  ← 17px Display 600
│  Nexus 为你的整个代码库... │  ← 14px muted
│                          │
│  ::before 光晕层（hover）  │  ← radial-gradient 600px circle
└──────────────────────────┘

材质层次：
- 默认：surface-1 背景
- hover：surface-2 背景 + ::before 光晕浮现
- 光晕定位：--mx / --my CSS 变量（useMouseGlow 写入）
```

3×2 Grid，卡片间用 1px hairline 分隔，营造"一体成型"的网格感。

### 7.3 WorkStep（流程步骤）

3 列横向排列，步骤间由 `::before` 伪元素画一条细线连接。数字使用 `#1E1F25` 大号数字 + `--mesh-gold` 小字 "Step" 叠加，形成层次。

### 7.4 StatItem（统计数字）

大号金色渐变数字（`font-size: 48px`），进入视口时 `useCountUp` 驱动从 0 滚动到目标值。4 列等宽，之间 1px hairline 分隔。

### 7.5 PricingCard（定价卡片）

```
普通卡                         高亮卡（featured）
┌──────────────────┐          ┌──────────────────┐
│                  │          │  ✦ 最受欢迎        │  ← 金色标签
│  入门版           │          │  专业版            │
│  免费             │          │  ¥199             │  ← 44px 大字
│  适合个人...      │          │  每人 / 月         │
│                  │          │                  │
│  ✓ 最多 3 个仓库  │          │  ✓ 无限仓库       │
│  ✓ 100 次 AI     │          │  ✓ 无限 AI        │
│                  │          │  ✓ 跨文件重构      │
│  [次按钮]         │          │  [主按钮 白底]     │
└──────────────────┘          └──────────────────┘
  border: hairline              border: gold 30%
  transform: none               transform: scale(1.03)
```

**年付切换逻辑**：`isYearly` ref 驱动 `computedPlans`，年付时专业版价格 = 月付 × 12 × 0.8 ÷ 12，约 ¥159/月。

### 7.6 FaqAccordion（FAQ 折叠面板）

手风琴模式：同时只展开一项。点击已展开项 → 收起；点击另一项 → 先收起前一项再展开当前项。

```html
<Transition name="faq">
  <!-- max-height: 0 → 200px + opacity 0 → 1 -->
</Transition>
```

`aria-expanded` 属性与展开状态实时同步，屏幕阅读器友好。

---

## 8. 交互设计

### 8.1 鼠标光晕追踪（`useMouseGlow`）

在 FeatureCard 卡片上移动鼠标时，`::before` 伪元素的 `radial-gradient` 中心跟随鼠标位置。离开时平滑复位到中心。

**技术原理**：
```
mousemove → 计算鼠标在卡片内百分比 → 写入 --mx, --my
CSS ::before → radial-gradient(circle at var(--mx) var(--my), ...)
transition: opacity 400ms → 进入时淡入，离开时淡出
```

### 8.2 渐变网格视差（GradientMesh）

鼠标在 Hero 区移动时，4 个 blob 各自按不同比例偏移：
- 靠近屏幕中心的 blob 偏移更多（factor 1.2）
- 边缘 blob 偏移更少（factor 0.6）
- 使用 RAF + lerp（factor 0.08）平滑跟随，产生"惯性"感

### 8.3 数字滚动（`useCountUp`）

统计数字进入视口时触发，`requestAnimationFrame` + quint ease-out，约 2 秒完成。整数自动千分位逗号。

### 8.4 终端打字机（`useTypewriter`）

页面加载后延迟 1 秒启动。逐字打印，每个字符间隔 35ms + 随机 0~20ms 抖动。行间停顿 400ms。打印完毕光标消失。

### 8.5 锚点平滑滚动

拦截所有 `a[href^="#"]` 点击，用 `window.scrollTo({ behavior: 'smooth' })` 替代原生跳转，偏移 -72px 避开固定导航栏。

### 8.6 导航栏响应式

- 滚动超过 60px → 背景从不透明变为 `surface-1` + `backdrop-filter: blur(12px)`
- 移动端 → 汉堡菜单，打开时锁定 body 滚动
- 键盘 Escape 关闭移动菜单

---

## 9. 响应式策略

### 断点

| 断点 | 对应设备 | 布局变化 |
|---|---|---|
| ≥961px | 桌面 | 3 列 Grid，完整 Hero 动画 |
| 601~960px | 平板 | 2 列 Grid，缩小 Hero 内边距 |
| ≤600px | 手机 | 单列，CTA 竖排，Hero 字号缩小 |

### 关键响应规则

```
桌面 (3列)        平板 (2列)        手机 (单列)
┌───┬───┬───┐    ┌───┬───┐         ┌───┐
│   │   │   │    │   │   │         │   │
└───┴───┴───┘    └───┴───┘         └───┘

定价卡：3 列对齐 → 单列居中（max-width: 420px）
统计数：4 列 → 2×2
步骤：  3 列 + 横线 → 单列堆叠，连接线隐藏
Hero：  padding 140px → 120px，字号 clamp 自动缩小
圆角：  保持不变（绝对值而非相对值）
```

---

## 10. 无障碍设计

| 措施 | 实现 |
|---|---|
| **跳过链接** | SkipLink 组件：Tab 键第一个聚焦，跳转到 `#main-content` |
| **焦点环** | `:focus-visible` 使用金色 2px 描边 + 3px 外偏移，替换浏览器默认蓝框 |
| **语义化 HTML** | `<nav>` / `<main>` / `<section>` / `<h1>~<h3>` 层级正确 |
| **aria 属性** | FAQ 按钮 `aria-expanded`，定价切换 `role="switch"` + `aria-checked` |
| **屏幕阅读器** | `.sr-only` class 隐藏纯装饰性说明 |
| **减少动效** | `@media (prefers-reduced-motion)` + 手动 `data-motion="off"` |
| **键盘导航** | 移动菜单支持 Escape 关闭，Tab 导航完整 |
| **颜色对比度** | 主文字 `#F7F8F8` 在 `#08090A` 上对比度 ≥ 15:1（远超 WCAG AA 4.5:1） |

---

## 11. 设计灵感来源

| 来源 | 借鉴 | 应用 |
|---|---|---|
| **Linear** | 暖暗底色、1px hairline、克制圆角 | 整个色彩系统和分割线策略 |
| **Vercel** | Hero 区渐变网格、暗色终端窗口 | GradientMesh 组件、TerminalTypewriter |
| **Raycast** | 琥珀金单主色 + 半透明层级 | 强调色策略、表面层级系统 |
| **Stripe** | 错位入场动画、定价页布局 | Hero stagger delay、Pricing 区设计 |

### 与 Linear 的关键差异

- Linear 用纯冷色系（蓝紫），本项目改用**暖色**（琥珀金 + 暖黑），更亲和
- Linear 字体更小更密（13px base），本项目**15px base** 更舒适
- Linear 几乎没有动画，本项目**适度加入动效**增加活力

---

## 附录 A：CSS 设计令牌速查

```css
/* 背景 */
--ground / --surface-1 / --surface-2 / --surface-3

/* 分割线 */
--hairline / --hairline-hover

/* 文字 */
--text-primary / --text-secondary / --text-muted

/* 网格色（仅 Hero 背景） */
--mesh-teal / --mesh-rose / --mesh-amber / --mesh-gold

/* 强调 */
--accent: #E8870A / --accent-glow

/* CTA */
--cta-bg: #FFFFFF / --cta-text: #08090A

/* 字体 */
--font-display / --font-body / --font-mono

/* 圆角 */
--radius-sm (8px) / --radius-md (12px) / --radius-lg (16px) / --radius-xl (24px)

/* 缓动 */
--ease-out / --ease-spring

/* 布局 */
--content-max: 1120px / --section-gap: 120px
```

## 附录 B：Composable 功能速查

| Composable | 文件 | 功能 | 触发条件 |
|---|---|---|---|
| `useTypewriter` | `useTypewriter.ts` | 终端逐字打印 + 光标闪烁 | 组件 mounted |
| `useCountUp` | `useCountUp.ts` | 数字 0→N 滚动动画 | Stats 区进入视口 |
| `useScrollReveal` | `useScrollReveal.ts` | 元素进入视口淡入上浮 | 元素 12% 可见 |
| `useMouseGlow` | `useMouseGlow.ts` | 卡片鼠标跟随光晕 | 鼠标在 `[data-glow]` 上移动 |
