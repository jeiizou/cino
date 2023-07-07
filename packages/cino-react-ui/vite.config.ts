import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        // reportCompressedSize: false,
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'lib/index.tsx'), // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
            name: 'cino-react-ui',
            // the proper extensions will be added
            fileName: 'cino-react-ui',
        },
    },
});
