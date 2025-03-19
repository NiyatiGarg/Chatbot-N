import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from "@vitejs/plugin-legacy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['> 0.25%, not dead'], // Broad compatibility
      // targets: ["defaults", "not IE 11"], // Target modern browsers and exclude IE 11
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"], // Include regenerator-runtime explicitly
    }),
  ],
})
