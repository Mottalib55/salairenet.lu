import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  trailingSlash: 'always',  site: 'https://salairenet.lu',
  integrations: [react(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
