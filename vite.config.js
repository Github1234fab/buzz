
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";


export default defineConfig({
        plugins: [sveltekit()],
       
});

// import { defineConfig } from "vite";
// import { svelte } from "@sveltejs/vite-plugin-svelte";

// export default defineConfig({
//         plugins: [svelte()],
//         build: {
//                 rollupOptions: {
//                         external: ["assets/arrowUp.svg", "assets/arrowDown.svg"],
//                 },
//         },
//         assetsInclude: ["**/*.svg"],
// });