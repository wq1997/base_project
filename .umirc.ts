import { defineConfig } from "umi";
import routes from "./src/router"
export default defineConfig({
  routes,
  npmClient: 'pnpm',
  plugins: ['@umijs/plugins/dist/dva'],
  dva:{}
});
