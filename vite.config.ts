import { defineConfig, searchForWorkspaceRoot } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  build: {
    outDir: '../build'
  },
  plugins: [reactRefresh()],
  server: {
    fs: {
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        '/src/**/*'
      ]
    }
  }
})
