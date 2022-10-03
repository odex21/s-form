import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    WindiCSS(),
    dts({
      // outputDir: resolve(__dirname, 'types'),
      insertTypesEntry: true,
      // skipDiagnostics: false,
      logDiagnostics: true,
      // entryRoot: 'src/index.ts',

      // compilerOptions: {
      //   skipLibCheck: true,
      //   strict: false,
      // },
      // staticImport: true,
    }),
  ],
  resolve: {
    alias: [],
  },
  build: {
    lib: {
      entry: './src/',
      formats: ['es'],
      fileName: 'index',
    },
  },
})
