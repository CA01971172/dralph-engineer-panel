import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { crx } from '@crxjs/vite-plugin';

// manifest.json の内容を定義
const manifest: chrome.runtime.ManifestV3 = {
    manifest_version: 3,
    name: "React TS MUI Chrome Extension (Dynamic)",
    version: "0.1.0",
    description: "React, TypeScript, MUI で作成された Chrome 拡張機能です。",
    icons: {
    //     "16": "icons/icon16.png",
    //     "48": "icons/icon48.png",
    //     "128": "icons/icon128.png"
    },
    action: { // ポップアップがない場合でも action は残し、アイコン指定などができます
    //     "default_icon": {
    //         "16": "icons/icon16.png",
    //         "48": "icons/icon48.png"
    //     }
    //     // default_popup は削除
    },
    content_scripts: [
        {
            matches: ["<all_urls>"],
            js: ["src/content/content.ts"], // ソースファイルを直接指定
            run_at: "document_idle"
        }
    ],
    permissions: ["storage"]
};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    plugins: [
        react(),
        crx({ manifest })
    ],
    root: '.',
    publicDir: 'public', // アイコンなどの静的アセット用
    build: {
        outDir: 'dist',
        sourcemap: command === 'serve' || process.env.NODE_ENV !== 'production',
    },
}));
