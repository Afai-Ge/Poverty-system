import { defineConfig } from "vite";
import { loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
// https://vitejs.dev/config/
export default ({ command, mode }) => {
  return defineConfig({
    plugins: [vue()],
    server: {
      host: "0.0.0.0",
      port: Number(loadEnv(mode, process.cwd()).VITE_APP_PORT),
      // port: loadEnv(mode, process.cwd()).VITE_APP_PROT,
      // port: Number("3001"),
      open: true,
      proxy: {
        "/api": {
          // target: "",
          target: loadEnv(mode, process.cwd()).VITE_APP_BASE_URL,
          changeOrigin: true, // 跨域
          rewrite: (path) => path.replace(/^\api/, ""),
        },
      },
      hmr: {
        overlay: false,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/global.scss";',
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
  });
};
