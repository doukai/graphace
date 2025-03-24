import type { LoadEvent } from "@sveltejs/kit";

let loadEvent: LoadEvent;

export function setLoadEvent(event: LoadEvent) {
    loadEvent = event;
}

export function getLoadEvent(): LoadEvent {
    return loadEvent;
}