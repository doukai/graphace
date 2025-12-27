<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { nanoid } from 'nanoid';
	import { zIndex } from '~';

	export type LoadingModalData = {
		id?: string | undefined;
		message: string;
		class?: string | undefined;
		zIndex?: number | undefined;
	};

	const modals = writable<LoadingModalData[]>([]);

	function open(modalData: LoadingModalData): string {
		if (!modalData.id) {
			modalData.id = nanoid();
		}
		if (modalData.zIndex === undefined) {
			modalData.zIndex = zIndex.next();
		}
		modals.update(($modals) => {
			return [...$modals, modalData];
		});
		return modalData.id;
	}

	function close(id?: string | undefined) {
		modals.update(($modals) => {
			if (id) {
				$modals = $modals.filter(($modal) => $modal.id !== id);
			} else {
				$modals.pop();
			}
			return $modals;
		});
	}

	function createLoadingModals() {
		const { subscribe } = modals;

		return {
			subscribe,
			open,
			close
		};
	}

	export const loading: {
		subscribe: (
			this: void,
			run: Subscriber<LoadingModalData[]>,
			invalidate?: (value?: LoadingModalData[]) => void
		) => Unsubscriber;
		open: (modalData: LoadingModalData) => string;
		close: (id?: string | undefined) => void;
	} = createLoadingModals();
</script>

<script lang="ts">
	import { LoadingModal } from '.';
	import type { Subscriber, Unsubscriber } from 'svelte/store';
</script>

{#each $modals as item (item.id)}
	<LoadingModal class={item.class} message={item.message} zIndex={item.zIndex} />
{/each}
