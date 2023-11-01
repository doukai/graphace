<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	import { nanoid } from 'nanoid';

	type MessageBoxComponent = {
		id: string;
		props: MessageBoxProps;
	};

	type MessageBoxProps = {
		title?: string | undefined;
		content?: string | undefined;
		buttonName?: string | undefined;
		buttonType?: string | undefined;
		isModalOpen?: boolean | undefined;
		cancel?: () => boolean | undefined;
		confirm?: () => boolean | undefined;
		button1?:
			| {
					name: string | undefined;
					className: string | undefined;
					onClick: () => boolean | undefined;
			  }
			| undefined;
		button2?:
			| {
					name: string | undefined;
					className: string | undefined;
					onClick: () => boolean | undefined;
			  }
			| undefined;
		button3?:
			| {
					name: string | undefined;
					className: string | undefined;
					onClick: () => boolean | undefined;
			  }
			| undefined;
	};
	const messageBoxStore = writable<MessageBoxComponent[]>([]);

	function open({
		title = undefined,
		content = undefined,
		buttonName = undefined,
		buttonType = undefined,
		cancel = () => true,
		confirm = () => true,
		button1 = undefined,
		button2 = undefined,
		button3 = undefined
	}: MessageBoxProps) {
		messageBoxStore.update((messageBox) => {
			return [
				...messageBox,
				{
					id: nanoid(),
					props: {
						title,
						content,
						buttonName,
						buttonType,
						isModalOpen: true,
						cancel,
						confirm,
						button1,
						button2,
						button3
					}
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

	export const messageBoxs: {
		subscribe: (
			this: void,
			run: Subscriber<MessageBoxComponent[]>,
			invalidate?: (value?: MessageBoxComponent[]) => void
		) => Unsubscriber;
		open: ({
			title,
			content,
			buttonName,
			buttonType,
			cancel,
			confirm,
			button1,
			button2,
			button3
		}: MessageBoxProps) => void;
		close: () => void;
	} = createMessageBoxStore();
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable, Subscriber, Unsubscriber } from 'svelte/store';
	import type { TranslationFunctions } from '~/i18n/i18n-types';
	import { Modal, ModalContent, ModalActions } from './modal';
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	const buttonClassName = (buttonType: string | undefined) => {
		if (buttonType) {
			return `btn-${buttonType}`;
		} else {
			return '';
		}
	};
</script>

{#each $messageBoxStore as messageBox (messageBox.id)}
	<Modal
		isModalOpen={messageBox.props.isModalOpen}
		title={messageBox.props.title}
		on:close={() => messageBoxs.close()}
	>
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
					if (messageBox.props.cancel && messageBox.props.cancel()) {
						messageBoxs.close();
					}
				}}
			>
				{$LL.ui.messageBox.cancel()}
			</button>
			{#if messageBox.props.button1}
				<button
					class="btn {messageBox.props.button1.className}"
					on:click={() => {
						if (messageBox.props.button1?.onClick()) {
							messageBoxs.close();
						}
					}}
				>
					{messageBox.props.button1.name}
				</button>
			{/if}
			{#if messageBox.props.button2}
				<button
					class="btn {messageBox.props.button2.className}"
					on:click={() => {
						if (messageBox.props.button2?.onClick()) {
							messageBoxs.close();
						}
					}}
				>
					{messageBox.props.button2.name}
				</button>
			{/if}
			{#if messageBox.props.button3}
				<button
					class="btn {messageBox.props.button3.className}"
					on:click={() => {
						if (messageBox.props.button3?.onClick()) {
							messageBoxs.close();
						}
					}}
				>
					{messageBox.props.button3.name}
				</button>
			{/if}
			<button
				class="btn btn-outline {buttonClassName(messageBox.props.buttonType)}"
				on:click={() => {
					if (messageBox.props.confirm && messageBox.props.confirm()) {
						messageBoxs.close();
					}
				}}
			>
				{messageBox.props.buttonName || $LL.ui.messageBox.confirm()}
			</button>
		</ModalActions>
	</Modal>
{/each}
