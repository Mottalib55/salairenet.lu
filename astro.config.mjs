import { defineConfig } from 'astro/config';
import trustKit from './src/integrations/trust-kit.mjs';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  trailingSlash: 'always',  site: 'https://salairenet.lu',
  integrations: [
    trustKit({ lang: 'fr', siteUrl: 'https://salairenet.lu', siteName: 'SalaireNet.lu', founded: '2026-06-27', about: '/a-propos/', method: '/methodologie/' }), react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
