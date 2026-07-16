import pluginVue from 'eslint-plugin-vue'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import prettierConfig from 'eslint-config-prettier'

/**
 * ESLint flat config (v9+)
 *
 * 规则链：TS 解析 → Vue 规则 → Prettier 覆盖（避免冲突）
 * 覆盖范围：.vue / .ts / .js
 */
export default [
  // ── 全局忽略 ──────────────────────────────────────────
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.*'],
  },

  // ── TypeScript + Vue 文件 ─────────────────────────────
  {
    files: ['**/*.ts', '**/*.vue'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // TS 严格规则
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  // ── Vue 规则 ──────────────────────────────────────────
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',   // 单字组件名允许
      'vue/no-v-html': 'warn',                   // v-html 告警（XSS 风险）
    },
  },

  // ── Prettier 覆盖（必须最后） ────────────────────────
  prettierConfig,
]
