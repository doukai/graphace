<script lang="ts">
	import { Modal, ModalContent, ModalActions } from '$lib/components/ui/modal';
	import { messageBox } from '$lib/stores/MessageBox';
	import LL from '$i18n/i18n-svelte';

	const buttonClassName = (buttonType: string) => {
		if (buttonType) {
			return `btn-${buttonType}`;
		} else {
			return '';
		}
	};
</script>

<Modal isModalOpen={$messageBox.isOpen} title={$messageBox.title}>
	{#if $messageBox.content}
		<ModalContent>
			{$messageBox.content}
		</ModalContent>
	{/if}
	<ModalActions>
		<button
			class="btn"
			on:click={() => {
				if ($messageBox.cancel()) {
					messageBox.close();
				}
			}}
		>
			{$LL.components.messageBox.cancel()}
		</button>
		<button
			class="btn btn-outline {buttonClassName($messageBox.buttonType)}"
			on:click={() => {
				if ($messageBox.confirm()) {
					messageBox.close();
				}
			}}
		>
			{$messageBox.buttonName || $LL.components.messageBox.confirm()}
		</button>
	</ModalActions>
</Modal>
