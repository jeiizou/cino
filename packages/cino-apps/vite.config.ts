import { defineConfig } from 'vite';
import { join, resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import sassDts from 'vite-plugin-sass-dts';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sassDts(), dts()],
  resolve: {
    alias: {
      '@': join(__dirname, 'lib'),
      '@apps': join(__dirname, 'lib/apps')
    }
  },
  css: {
    modules: {
      generateScopedName(name) {
        return `cino-apps-${name}`;
      }
    }
  },
  build: {
    // reportCompressedSize: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/index.tsx'), // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      name: 'cino-apps',
      // the proper extensions will be added
      fileName: 'cino-apps',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom', 'antd', 'cino-core', 'cino-react-ui', 'ahooks']
    }
  }
});
