<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { nanoid } from 'nanoid';

	export type AlertData = {
		id?: string | undefined;
		title: string;
		class?: string | undefined;
		description?: string | undefined;
		isModalOpen?: boolean | undefined;
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

	const alerts = writable<AlertData[]>([]);

	function open(alertData: AlertData): string {
		if (!alertData.id) {
			alertData.id = nanoid();
		}
		alerts.update(($alerts) => {
			return [...$alerts, alertData];
		});
		return alertData.id;
	}

	function close(id?: string | undefined) {
		alerts.update(($alerts) => {
			if (id) {
				$alerts = $alerts.filter(($alert) => $alert.id !== id);
			} else {
				$alerts.pop();
			}
			return $alerts;
		});
	}

	function createAlerts() {
		const { subscribe } = alerts;

		return {
			subscribe,
			open,
			close
		};
	}

	export const alert: {
		subscribe: (
			this: void,
			run: Subscriber<AlertData[]>,
			invalidate?: (value?: AlertData[]) => void
		) => Unsubscriber;
		open: (alertData: AlertData) => void;
		close: () => void;
	} = createAlerts();
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import { Modal, ModalAction } from '../modal';
	import type { Readable, Subscriber, Unsubscriber } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';

	const LL = getContext<Readable<TranslationFunctions>>('LL');
</script>

{#each $alerts as a (a.id)}
	<Modal class={a.class} isModalOpen={a.isModalOpen} title={a.title} on:close={() => alert.close()}>
		{#if a.description}
			<p class="py-4">
				{@html a.description}
			</p>
		{/if}
		<ModalAction>
			<button
				class="btn"
				on:click={() => {
					if (a.cancel && a.cancel()) {
						alert.close();
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
								alert.close();
							}
						}}
					>
						{button.name}
					</button>
				{/each}
			{/if}
			<button
				class="btn btn-primary"
				on:click={() => {
					if (a.confirm && a.confirm()) {
						alert.close();
					}
				}}
			>
				{$LL.ui.message.confirm()}
			</button>
		</ModalAction>
	</Modal>
{/each}
