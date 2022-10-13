import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      // skipDiagnostics: false,
      logDiagnostics: true,
      include: ['src/index.ts'],
    }),
  ],
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', '@s-form/core', 'element-plus'],
    },
  },
})
