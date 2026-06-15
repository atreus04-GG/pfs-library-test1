import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Unique per deployment: GitHub Actions sets GITHUB_SHA automatically.
// Falls back to 'dev' locally so reloads don't wipe storage during development.
const buildId = process.env.GITHUB_SHA || 'dev';

export default defineConfig({
  base: '/pfs-library/',
  plugins: [react()],
  define: {
    __BUILD_ID__: JSON.stringify(buildId),
  },
  server: { port: 5173, open: true }
});
