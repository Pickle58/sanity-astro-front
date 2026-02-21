import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import sanity from "@sanity/astro";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ['axodg5mc.api.sanity.io']
  },
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    // 👇 update these lines
    sanity({
      projectId: "axodg5mc",
      dataset: "production",
      useCdn: false, // for static builds
    }),
  ],

  adapter: cloudflare(),
});