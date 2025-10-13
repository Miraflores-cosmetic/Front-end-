import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      // Optimize PNG images and convert to WebP
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      // Generate WebP versions
      webp: {
        quality: 85,
      },
      // Optimize JPEG images
      mozjpeg: {
        quality: 80,
      },
      // Optimize SVG files
      svgo: {
        plugins: [
          {
            name: "removeViewBox",
            active: false,
          },
          {
            name: "removeEmptyAttrs",
            active: false,
          },
        ],
      },
      // Optimize GIF images
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enable asset optimization
    assetsInlineLimit: 4096, // 4kb
    rollupOptions: {
      output: {
        // Organize assets by type
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split(".") || [];
          const ext = info[info.length - 1];
          if (
            /\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/i.test(
              assetInfo.name || ""
            )
          ) {
            return `assets/images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
  },
});
