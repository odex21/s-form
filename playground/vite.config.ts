import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  plugins: [
    Vue(),
    WindiCSS({
      scan: {
        include: ['../packages/core/src/**'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@s-form/core': resolve(__dirname, '../packages/core/src/index.ts'),
    },
  },
})
