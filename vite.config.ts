import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// relative base: works on a project page (lovlydev.github.io/<repo>/) and on the client's own domain
export default defineConfig({
  base: './',
  plugins: [react()],
});
