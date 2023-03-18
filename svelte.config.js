import adapter from "@sveltejs/adapter-auto";
import {vitePreprocess} from '@sveltejs/kit/vite';
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({ out: 'build' }),
    },
    vite: {
        resolve: {
            alias: {
                $lib: path.resolve("./src/lib")
            }
        }
    }
};

export default config;