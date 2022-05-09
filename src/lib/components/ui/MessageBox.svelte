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

{#each $messageBox as modal (modal.id)}
	<Modal isModalOpen={true} title={modal.title}>
		{#if modal.content}
			<p class="py-4">
				{modal.content}
			</p>
		{/if}
		<ModalActions>
			<button
				class="btn"
				on:click={() => {
					if (modal.cancel()) {
						messageBox.close();
					}
				}}
			>
				{$LL.components.messageBox.cancel()}
			</button>
			<button
				class="btn btn-outline {buttonClassName(modal.buttonType)}"
				on:click={() => {
					if (modal.confirm()) {
						messageBox.close();
					}
				}}
			>
				{modal.buttonName || $LL.components.messageBox.confirm()}
			</button>
		</ModalActions>
	</Modal>
{/each}
