import { writable } from "svelte/store";

export interface Metadata {
    title?: string;
    description?: string;
    headline?: string;
}
export interface Userdata {
    isLogin?: boolean;
}
export const userdata = writable<Userdata>({});
export const metadata = writable<Metadata>({});
