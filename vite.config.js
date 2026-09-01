import { defineConfig } from 'vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { Features } from 'lightningcss' // 1. Import the Feature flags from Lightning CSS

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  css: {
    lightningcss: {
      // 2. Explicitly tell Lightning CSS NOT to transpile or alter light-dark() functions
      exclude: Features.LightDark 
    }
  },
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: '@toheeb/base',
      fileName: 'base', 
      formats: ['es', 'umd'] 
    },
    
    // Enable Source Maps so you can trace minified bugs back to index.js / index.css
    sourcemap: true,

    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  }
})
