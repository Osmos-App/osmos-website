import { resolve } from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [tailwindcss()],
    root: './',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                privacy: resolve(__dirname, 'privacy.html'),
                features: resolve(__dirname, 'features/index.html'),
                security: resolve(__dirname, 'security/index.html'),
                opensource: resolve(__dirname, 'open-source/index.html'),
                pricing: resolve(__dirname, 'pricing/index.html'),
                macos: resolve(__dirname, 'macos/index.html'),
                windows: resolve(__dirname, 'windows/index.html'),
                linux: resolve(__dirname, 'linux/index.html'),
                android: resolve(__dirname, 'android/index.html'),
                docs: resolve(__dirname, 'docs/index.html'),
                blog: resolve(__dirname, 'blog/index.html'),
                download: resolve(__dirname, 'download/index.html')
            }
        }
    },
    server: {
        host: '0.0.0.0',
    }
}); 