import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 🟠 BU KISMI EKLE: GitHub repo adınla aynı olmalı
export default defineConfig({
  base: '/urun-listesi0/',
  plugins: [react()],
})