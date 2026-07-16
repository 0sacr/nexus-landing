<!--
  AppNav — 固定顶部导航栏
  - 桌面端：Logo + 链接列表 + 登录按钮
  - 移动端（≤960px）：隐藏链接，显示汉堡菜单 ☰
  - 滚动时背景加深（.scrolled）
  - 移动端侧滑面板：overlay 模糊遮罩 + 右侧滑入菜单
  - ESC / 点击遮罩 / 点击链接 → 关闭菜单
-->
<template>
  <!-- 桌面 + 移动共用导航条 -->
  <nav class="nav" :class="{ scrolled }" id="nav">
    <!-- Logo -->
    <a href="#" class="nav-logo">
      <span class="nav-logo-mark">N</span>
      Nexus
    </a>

    <!-- 桌面链接（≥961px 可见） -->
    <ul class="nav-links">
      <li><a href="#features" @click.prevent="smoothScroll('#features')">功能</a></li>
      <li><a href="#how-it-works" @click.prevent="smoothScroll('#how-it-works')">工作原理</a></li>
      <li><a href="#pricing" @click.prevent="smoothScroll('#pricing')">定价</a></li>
      <li><a href="#">文档</a></li>
    </ul>

    <!-- 桌面 CTA -->
    <button class="nav-cta">登录</button>

    <!-- 移动端汉堡按钮（≤960px 可见） -->
    <button class="nav-menu-btn" aria-label="菜单" @click="openMobileNav">☰</button>
  </nav>

  <!-- 移动端遮罩层 -->
  <div
    class="mobile-overlay"
    :class="{ open: mobileOpen }"
    aria-hidden="true"
    @click="closeMobileNav"
  ></div>

  <!-- 移动端侧滑菜单 -->
  <nav class="mobile-nav" :class="{ open: mobileOpen }" aria-label="移动端导航">
    <button class="mobile-nav-close" aria-label="关闭菜单" @click="closeMobileNav">✕</button>
    <a href="#features" @click.prevent="mobileNavTo('#features')">功能</a>
    <a href="#how-it-works" @click.prevent="mobileNavTo('#how-it-works')">工作原理</a>
    <a href="#pricing" @click.prevent="mobileNavTo('#pricing')">定价</a>
    <a href="#">文档</a>
    <a href="#" class="mobile-nav-cta">登录</a>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// ── 滚动状态（导航条背景加深） ────────────────────────────────
const scrolled = ref<boolean>(false)
let scrollTicking = false

function onScroll(): void {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      scrolled.value = window.scrollY > 20
      scrollTicking = false
    })
    scrollTicking = true
  }
}

// ── 移动端菜单状态 ────────────────────────────────────────────
const mobileOpen = ref<boolean>(false)

function openMobileNav(): void {
  mobileOpen.value = true
  document.body.style.overflow = 'hidden'
  requestAnimationFrame(() => {
    const closeBtn = document.querySelector<HTMLElement>('.mobile-nav-close')
    if (closeBtn) closeBtn.focus()
  })
}

function closeMobileNav(): void {
  mobileOpen.value = false
  document.body.style.overflow = ''
}

/** 移动端点击链接 → 关闭菜单 + 平滑滚动 */
function mobileNavTo(selector: string): void {
  closeMobileNav()
  smoothScroll(selector)
}

// ── ESC 关闭 ──────────────────────────────────────────────────
function onKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape' && mobileOpen.value) {
    closeMobileNav()
  }
}

// ── 锚点平滑滚动（补偿固定导航栏高度 72px） ─────────────────
function smoothScroll(selector: string): void {
  const target = document.querySelector(selector)
  if (target) {
    const top = target.getBoundingClientRect().top + window.pageYOffset - 72
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('keydown', onKeydown)
  // 确保页面滚动恢复
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ── 导航条 ───────────────────────────────────────────────── */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 40px;

  background: rgba(8, 9, 10, 0.72);
  backdrop-filter: blur(24px) saturate(1.4);
  -webkit-backdrop-filter: blur(24px) saturate(1.4);
  border-bottom: 1px solid var(--hairline);
  transition: background 400ms var(--ease-out);
}

/* 滚动后背景加深 */
.nav.scrolled {
  background: rgba(8, 9, 10, 0.92);
}

/* ── Logo ─────────────────────────────────────────────────── */
.nav-logo {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-logo-mark {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, var(--mesh-amber), var(--mesh-gold));
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #08090a;
}

/* ── 桌面链接 ─────────────────────────────────────────────── */
.nav-links {
  display: flex;
  gap: 36px;
  list-style: none;
  align-items: center;
}

.nav-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: color 200ms var(--ease-out);
}

.nav-links a:hover {
  color: var(--text-primary);
}

/* ── 登录按钮 ─────────────────────────────────────────────── */
.nav-cta {
  padding: 6px 18px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  border: 1px solid var(--hairline);
  cursor: pointer;
  letter-spacing: -0.01em;
  transition:
    background 200ms var(--ease-out),
    border-color 200ms var(--ease-out);
}

.nav-cta:hover {
  background: rgba(255, 255, 255, 0.16);
  border-color: var(--hairline-hover);
}

/* ── 汉堡按钮（默认隐藏，≤960px 显示） ────────────────────── */
.nav-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 22px;
  cursor: pointer;
  padding: 4px;
}

/* ── 遮罩层 ───────────────────────────────────────────────── */
.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 350ms var(--ease-out);
}

.mobile-overlay.open {
  opacity: 1;
  pointer-events: auto;
}

/* ── 侧滑菜单 ─────────────────────────────────────────────── */
.mobile-nav {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 301;
  width: 320px;
  max-width: 85vw;
  background: var(--surface-1);
  border-left: 1px solid var(--hairline);
  display: flex;
  flex-direction: column;
  padding: 80px 40px 40px;
  transform: translateX(100%);
  transition: transform 400ms var(--ease-out);
}

.mobile-nav.open {
  transform: translateX(0);
}

.mobile-nav-close {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 28px;
  cursor: pointer;
  padding: 8px;
  line-height: 1;
}

.mobile-nav a {
  display: block;
  padding: 14px 0;
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  color: var(--text-secondary);
  text-decoration: none;
  letter-spacing: -0.02em;
  border-bottom: 1px solid var(--hairline);
  transition: color 200ms var(--ease-out);
}

.mobile-nav a:hover,
.mobile-nav a:focus-visible {
  color: var(--text-primary);
}

.mobile-nav-cta {
  margin-top: 24px !important;
  padding: 14px 24px;
  border-radius: 8px;
  background: var(--cta-bg);
  color: var(--cta-text) !important;
  text-align: center;
  font-size: 16px;
  border: none !important;
}

/* ── 响应式 ───────────────────────────────────────────────── */
@media (max-width: 960px) {
  .nav-links,
  .nav-cta {
    display: none;
  }

  .nav-menu-btn {
    display: block;
  }

  .nav {
    padding: 0 24px;
  }
}
</style>
