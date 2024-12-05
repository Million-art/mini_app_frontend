import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import path from 'path';

// Correctly typing __filename and __dirname in TypeScript
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Export the Vite configuration using TypeScript
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'esbuild',
},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
