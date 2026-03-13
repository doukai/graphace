import type { Event } from "@graphace/ui-graphql";
import { writable, type Writable } from "svelte/store";

export const loadEvent: Writable<Event> = writable();