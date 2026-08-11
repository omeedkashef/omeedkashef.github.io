import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Root user site (omeedkashef.github.io) is served from the domain root,
  // so assets resolve from '/'. A subpath here would break them on Pages.
  base: '/',
})
