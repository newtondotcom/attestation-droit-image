import type { Writable } from "stream";
import { writable } from "svelte/store";

export const pdfStore = writable<Writable>();