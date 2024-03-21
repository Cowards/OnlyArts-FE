// vite.config.(js|ts)
import { defineConfig } from 'vite'
import pugPlugin from 'vite-plugin-pug'

const optionsPug = { pretty: true } // FIXME: pug pretty is deprecated!
const localsPug = { name: 'My Pug' }

export default defineConfig({
  plugins: [pugPlugin(optionsPug)],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // ssr: true,
    bundle: true,
    target: 'esnext'
  }
  // root: 'src'
})
