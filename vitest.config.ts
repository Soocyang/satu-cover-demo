import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
    setupFiles: ['vitest.setup.ts'],
  },
});
