import type { Writable } from "stream";
import { writable } from "svelte/store";

export const pdfStoreUri = writable<Writable>();
export const pdfStoreBlob = writable<string>();