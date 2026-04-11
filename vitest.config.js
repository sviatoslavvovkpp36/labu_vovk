import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom', // Це дозволяє Vitest розуміти HTML/DOM
    globals: true,
  },
});