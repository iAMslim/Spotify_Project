// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import proxy from "vite-plugin-proxy";

// export default defineConfig({
//   plugins: [
//     react(),
//     proxy({
//       "/auth/**": {
//         target: "http://localhost:5000",
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/auth/, ""),
//       },
//     }),
//   ],
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

