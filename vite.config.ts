import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // 👇 YEH LINE BOHT ZAROORI HAI (Is se Black Screen theek hogi)
  // Agar aapki repository ka naam 'DeenLife' nahi hai, to ise badal lein
  base: '/DeenLife/',

  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  
  // 👇 Yahan humne aapki Key ko direct fix kar diya hai
  define: {
    'process.env.API_KEY': JSON.stringify("AIzaSyAKP8c_him5zq8IHBg-TgkVxZGFWwX4BSM"),
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
