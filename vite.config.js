import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // এখানে যদি base লেখা থাকে তবে সেই লাইনটি পুরো মুছে দাও
})