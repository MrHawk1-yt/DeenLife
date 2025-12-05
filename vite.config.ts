import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Safe process.cwd() execution to prevent type errors in some CI environments
  // Fix: Cast process to any to avoid "Property 'cwd' does not exist on type 'Process'" error
  const cwd = typeof process !== 'undefined' && typeof (process as any).cwd === 'function' ? (process as any).cwd() : '.';
  const env = loadEnv(mode, cwd, '');

  return {
    plugins: [react()],
    // CRITICAL: './' ensures assets load correctly on GitHub Pages
    base: './', 
    define: {
      // Safely inject the API Key. Defaults to empty string to prevent build crash.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY || ""),
      // Define process.env as empty object to prevent "process is not defined" browser errors
      'process.env': {} 
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
});
