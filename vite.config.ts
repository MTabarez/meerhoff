import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

function normalizeBasePath(rawBase?: string): string | undefined {
  if (!rawBase) {
    return undefined;
  }
  const trimmed = rawBase.trim();
  if (!trimmed || trimmed === '/') {
    return '/';
  }
  if (trimmed === './' || trimmed === '.') {
    return './';
  }
  const collapsed = trimmed.replace(/\/+/g, '/');
  const withLeading = collapsed.startsWith('/') ? collapsed : `/${collapsed}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

export default defineConfig(({command}) => {
  const base =
    normalizeBasePath(process.env.VITE_BASE_PATH) ??
    (command === 'build' ? './' : '/');

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
      // Prepares static output for GitHub Pages: disables Jekyll, adds SPA 404 fallback,
      // and removes internal reference attachments from the published bundle.
      {
        name: 'github-pages-prep',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          if (!fs.existsSync(distDir)) {
            return;
          }

          fs.writeFileSync(path.join(distDir, '.nojekyll'), '');

          const indexHtml = path.join(distDir, 'index.html');
          const notFoundHtml = path.join(distDir, '404.html');
          if (fs.existsSync(indexHtml)) {
            fs.copyFileSync(indexHtml, notFoundHtml);
          }

          const internalAttachmentsDir = path.join(distDir, 'assets', 'aistudio');
          if (fs.existsSync(internalAttachmentsDir)) {
            fs.rmSync(internalAttachmentsDir, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
