import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { resolve } from "path"


const srcPath = __dirname.endsWith("client") ? "./src" : "./client/src"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, srcPath) },
    ]
  },
})
