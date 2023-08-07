import { defineConfig } from "umi";
import routes from "./src/router"

const path = require('path');

export default defineConfig({
  routes,
  npmClient: 'pnpm',
  plugins: ['@umijs/plugins/dist/dva'],
  dva:{},
  alias: {
    '@/permissions': path.resolve(__dirname,'src/permissions'),
    '@/hooks': path.resolve(__dirname,'src/hooks'),
  }
});
