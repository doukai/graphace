import type { LoadEvent } from "@sveltejs/kit";
import { writable, type Writable } from "svelte/store";

export const loadEvent: Writable<LoadEvent> = writable();