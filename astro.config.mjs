// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import markdoc from '@astrojs/markdoc';
import partytown from '@astrojs/partytown';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc(), partytown()],

  

  vite: {
      css: {
      transformer: 'lightningcss'
    },

    plugins: [tailwindcss()]
  }
});