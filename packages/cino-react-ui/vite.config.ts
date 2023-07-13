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
      '@components': join(__dirname, 'lib/components'),
    },
  },
  css: {
    modules: {
      generateScopedName(name) {
        return `cino-${name}`;
      },
    },
  },
    build: {
        // reportCompressedSize: false,
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'lib/index.tsx'), // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
            name: 'cino-react-ui',
            // the proper extensions will be added
            fileName: 'cino-react-ui',
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['react', 'react-dom'],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});
