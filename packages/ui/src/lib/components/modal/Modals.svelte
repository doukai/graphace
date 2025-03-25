<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { nanoid } from 'nanoid';
	import { zIndex } from '~';

	export type ModalData = {
		id?: string | undefined;
		title: string;
		class?: string | undefined;
		description?: string | undefined;
		isModalOpen?: boolean | undefined;
		zIndex?: number | undefined;
		cancel?: (() => boolean) | undefined;
		confirm?: (() => boolean) | undefined;
		buttons?:
			| {
					name: string;
					class?: string | undefined;
					onClick: () => boolean;
			  }[]
			| undefined;
	};

	const modals = writable<ModalData[]>([]);

	function open(modalData: ModalData): string {
		if (!modalData.id) {
			modalData.id = nanoid();
		}
		if (modalData.isModalOpen === undefined) {
			modalData.isModalOpen = true;
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

	function createModals() {
		const { subscribe } = modals;

		return {
			subscribe,
			open,
			close
		};
	}

	export const modal: {
		subscribe: (
			this: void,
			run: Subscriber<ModalData[]>,
			invalidate?: (value?: ModalData[]) => void
		) => Unsubscriber;
		open: (modalData: ModalData) => string;
		close: (id?: string | undefined) => void;
	} = createModals();
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import { Modal, ModalAction } from '.';
	import type { Readable, Subscriber, Unsubscriber } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	const LL = getContext<Readable<TranslationFunctions>>('LL');
</script>

{#each $modals as a (a.id)}
	<Modal
		class={a.class}
		isModalOpen={a.isModalOpen}
		title={a.title}
		zIndex={a.zIndex}
		on:close={() => modal.close()}
	>
		{#if a.description}
			<p class="py-4">
				{@html a.description}
			</p>
		{/if}
		<ModalAction>
			<button
				class="btn"
				on:click={() => {
					if (a.cancel) {
						if (a.cancel()) {
							modal.close();
						}
					} else {
						modal.close();
					}
				}}
			>
				{$LL.ui.message.cancel()}
			</button>
			{#if a.buttons}
				{#each a.buttons as button}
					<button
						class="btn {button.class || ''}"
						on:click={() => {
							if (button.onClick()) {
								modal.close();
							}
						}}
					>
						{button.name}
					</button>
				{/each}
			{/if}
			{#if a.confirm}
				<button
					class="btn btn-primary"
					on:click={() => {
						if (a.confirm && a.confirm()) {
							modal.close();
						}
					}}
				>
					{$LL.ui.message.confirm()}
				</button>
			{/if}
		</ModalAction>
	</Modal>
{/each}
