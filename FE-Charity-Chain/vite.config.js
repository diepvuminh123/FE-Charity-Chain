import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Tách vendor chunks → browser cache thư viện riêng, không re-download khi app update
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-axios': ['axios'],
          'vendor-ui': ['lucide-react'],
        },
      },
    },
    // Cảnh báo nếu chunk > 500kb
    chunkSizeWarningLimit: 500,
    // Bật minify mạnh hơn
    minify: 'esbuild',
    sourcemap: false,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})
