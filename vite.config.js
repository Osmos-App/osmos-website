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
                download: resolve(__dirname, 'download/index.html'),
                main_tr: resolve(__dirname, 'tr/index.html'),
                privacy_tr: resolve(__dirname, 'tr/privacy.html'),
                features_tr: resolve(__dirname, 'tr/features/index.html'),
                security_tr: resolve(__dirname, 'tr/security/index.html'),
                opensource_tr: resolve(__dirname, 'tr/open-source/index.html'),
                pricing_tr: resolve(__dirname, 'tr/pricing/index.html'),
                macos_tr: resolve(__dirname, 'tr/macos/index.html'),
                windows_tr: resolve(__dirname, 'tr/windows/index.html'),
                linux_tr: resolve(__dirname, 'tr/linux/index.html'),
                android_tr: resolve(__dirname, 'tr/android/index.html'),
                docs_tr: resolve(__dirname, 'tr/docs/index.html'),
                blog_tr: resolve(__dirname, 'tr/blog/index.html'),
                download_tr: resolve(__dirname, 'tr/download/index.html')
            }
        }
    },
    server: {
        host: '0.0.0.0',
    }
}); 