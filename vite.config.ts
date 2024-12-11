import {defineConfig, Plugin} from "vite";
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => ({
  build: {
    // sourcemaps have to be inline due to https://github.com/electron/electron/issues/22996
    sourcemap: "inline",
  },
  plugins: [react()],
  base: mode === "production" ? "./" : "/",
}));
