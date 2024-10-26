import path from 'path'
import dotenv from 'dotenv'
import { defineConfig } from 'vite'

dotenv.config()

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
