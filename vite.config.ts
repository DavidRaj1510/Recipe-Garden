import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    base: "/Recipe-Garden/",
    server: {
      host: "localhost",
      port: 5173,
    },
    plugins: [
      react(),
      ...(isDev ? [componentTagger()] : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});