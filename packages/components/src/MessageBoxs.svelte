<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { nanoid } from 'nanoid';

	type MessageBoxComponent = {
		id: string;
		props: MessageBoxProps;
	};

	type MessageBoxProps = {
		title?: string;
		content?: string;
		buttonName?: string;
		buttonType?: string;
		isModalOpen?: boolean;
		cancel?: () => boolean;
		confirm?: () => boolean;
	};
	const messageBoxStore = writable<MessageBoxComponent[]>([]);

	function open({
		title = null,
		content = null,
		buttonName = null,
		buttonType = null,
		cancel = () => true,
		confirm = () => true
	}: MessageBoxProps) {
		messageBoxStore.update((messageBox) => {
			return [
				...messageBox,
				{
					id: nanoid(),
					props: { title, content, buttonName, buttonType, isModalOpen: true, cancel, confirm }
				}
			];
		});
	}

	function close() {
		messageBoxStore.update((messageBox) => {
			messageBox.pop();
			return messageBox;
		});
	}

	function createMessageBoxStore() {
		const { subscribe } = messageBoxStore;

		return {
			subscribe,
			open,
			close
		};
	}

	export const messageBoxs = createMessageBoxStore();
</script>

<script lang="ts">
	import { Modal, ModalContent, ModalActions } from './modal';
	import LL from './i18n/i18n-svelte';

	const buttonClassName = (buttonType: string) => {
		if (buttonType) {
			return `btn-${buttonType}`;
		} else {
			return '';
		}
	};
</script>

{#each $messageBoxStore as messageBox (messageBox.id)}
	<Modal isModalOpen={messageBox.props.isModalOpen} title={messageBox.props.title}>
		<ModalContent>
			{#if messageBox.props.content}
				<p class="py-4">
					{messageBox.props.content}
				</p>
			{/if}
		</ModalContent>
		<ModalActions>
			<button
				class="btn"
				on:click={() => {
					if (messageBox.props.cancel()) {
						messageBoxs.close();
					}
				}}
			>
				{$LL.components.messageBox.cancel()}
			</button>
			<button
				class="btn btn-outline {buttonClassName(messageBox.props.buttonType)}"
				on:click={() => {
					if (messageBox.props.confirm()) {
						messageBoxs.close();
					}
				}}
			>
				{messageBox.props.buttonName || $LL.components.messageBox.confirm()}
			</button>
		</ModalActions>
	</Modal>
{/each}
