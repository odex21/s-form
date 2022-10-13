import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
  plugins: [
    typescript({
      // include: ['src/index.ts'],
      // baseUrl: '.',
      // tsconfig: {
      //   // com
      //   // declaration: true,
      //   // outDir: 'dist',
      // },
    }),
  ],
  input: 'src/index.ts',
  output: { file: 'dist/index.mjs' },
  external: ['@s-form/core', 'element-plus'],
})
