# DeenLife App

A comprehensive Islamic lifestyle companion built with React, TypeScript, and Tailwind CSS.

## Deployment Instructions

Since you want to host this on your own platform (WordPress/cPanel/etc.), follow these steps:

### 1. Prerequisites
You need **Node.js** installed on your computer to build the final optimized files.

### 2. Install & Build
1. Download all the files from the code editor.
2. Open a terminal in the project folder.
3. Run `npm install` to install dependencies.
4. Run `npm run build`.

### 3. Upload to Hosting
1. After building, a `dist` folder will be created.
2. This `dist` folder contains the final `index.html` and optimized JavaScript files.
3. Upload the **contents** of the `dist` folder to your web server (e.g., inside `public_html/deenlife` or your WordPress directory).

### 4. Configuration
- **API Key**: The AI features (Gemini) require an API Key.
  - Open `services/geminiService.ts` before building.
  - Replace `process.env.API_KEY` with your actual key string: `apiKey: "YOUR_ACTUAL_KEY_HERE"`.
  - **Security Warning**: Since this is a client-side app, your API key will be visible to users who inspect the code. It is recommended to restrict the API key in Google Cloud Console to only allow requests from your specific domain (e.g., `yourwebsite.com`).

### 5. Hosting on WordPress
- You can simply upload the `dist` files to a folder on your server.
- Link to that folder from your WordPress menu (e.g., `https://yoursite.com/apps/deenlife`).

## Features
- **Prayer Times**: Accurate calculations based on location.
- **Quran Tracker**: Track reading progress.
- **Quran Audio**: Listen to top reciters.
- **Hadith & Dua**: Extensive collections with search.
- **AI Assistant**: Powered by Google Gemini.
- **Qibla Finder**: Real-time compass.
- **Sunnah Habits**: Daily tracker.
