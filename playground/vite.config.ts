import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import WindiCSS from 'vite-plugin-windicss'
import Markdown from 'vite-plugin-md'
import code from '@yankeeinlondon/code-builder'
import shiki from 'markdown-it-shiki'
import { createBuilder } from '@yankeeinlondon/builder-api'
import { highlight } from './config/highlight'
import { highlightLinePlugin } from './config/highlightLine'
import { preWrapperPlugin } from './config/preWrapper'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    //@ts-ignore
    Markdown({
      builders: [
        createBuilder('code', 'parser')
          .options()
          .initializer()
          .handler(async (p, o) => {
            p.parser.set({
              highlight: await highlight({
                light: 'vitesse-light',
                dark: 'nord',
              }),
            })
            p.parser.use(highlightLinePlugin).use(preWrapperPlugin)
            return p
          })
          .meta()(),
      ],
      wrapperClasses: 'vp-doc',
    }),
    vueJsx(),
    WindiCSS({
      scan: {
        include: ['../packages/core/src/**'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@s-form/core': resolve(__dirname, '../packages/core/src/index.ts'),
    },
  },
})
