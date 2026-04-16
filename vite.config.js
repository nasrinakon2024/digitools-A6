import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/digitools-A6/', // এই লাইনটি আপনার রিপোজিটরির নাম অনুযায়ী যোগ করুন
})