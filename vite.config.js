import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import fs from "fs";
import path from "path";

export default defineConfig({
        plugins: [sveltekit()],
        server: {
                https: {
                        key: fs.readFileSync(path.resolve(__dirname, "./src/certificates/your.key")),
                        cert: fs.readFileSync(path.resolve(__dirname, "./src/certificates/your.crt")),
                },
        },
});
