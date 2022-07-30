/// <reference types="vitest" />

import { resolve } from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
    },
  },
  test: {
    reporters: 'verbose',
    globals: true,
    environment: 'edge-runtime',
    coverage: {
      all: true,
      enabled: Boolean(process.env.CI || process.env.COVERAGE),
      reporter: ['text', 'json', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['**/*.{test,spec}.{ts,tsx}', '**/*.d.ts'],
    },
  },
});
