import {readable, writable} from "svelte/store";

export interface Metadata {
    title?: string;
    description?: string;
    headline?: string;
}

export const user = writable({
    name: '',
    seq: 0
});

export const apiBaseUrl = readable("https://api.kbsl.dev");
export const metadata = writable<Metadata>({});