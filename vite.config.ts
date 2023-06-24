import 'dotenv/config'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/airtable': {
        target: 'https://api.airtable.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/airtable/, ''),
        headers: {
          Authorization: `Bearer ${process.env.VITE_AIRTABLE_PAT}`,
        },
      },
    },
  },
})
