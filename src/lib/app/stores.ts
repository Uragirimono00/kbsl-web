import { writable } from "svelte/store";

export interface Metadata {
    title?: string;
    description?: string;
    headline?: string;
}
const Userdata = {
    userName: 'sample',
    userSeq: 0
};
export const userdata = writable(Userdata);
export const metadata = writable<Metadata>({});