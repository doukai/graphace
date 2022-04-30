<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { notifications } from '$lib/stores/Notifications';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { InformationCircle, CheckCircle, Exclamation, XCircle } from '@steeze-ui/heroicons';

	const alertClassName = (alertType: string) => {
		if (alertType === 'info') {
			return 'alert-info';
		} else if (alertType === 'success') {
			return 'alert-success';
		} else if (alertType === 'warning') {
			return 'alert-warning';
		} else if (alertType === 'error') {
			return 'alert-error';
		} else {
			return '';
		}
	};
</script>

<div class="fixed inset-0 z-30 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
	<div class="w-full flex flex-col items-center space-y-4">
		{#each $notifications as notification (notification.id)}
			<div animate:flip transition:fly={{ y: 30 }}>
				<div class="alert {alertClassName(notification.type)} shadow-lg">
					<div>
						{#if notification.type === 'info'}
							<Icon src={InformationCircle} solid class="h-5 w-5" />
						{:else if notification.type === 'success'}
							<Icon src={CheckCircle} solid class="h-5 w-5" />
						{:else if notification.type === 'warning'}
							<Icon src={Exclamation} solid class="h-5 w-5" />
						{:else if notification.type === 'error'}
							<Icon src={XCircle} solid class="h-5 w-5" />
						{:else}
							<Icon src={InformationCircle} solid class="h-5 w-5" />
						{/if}
						<span>{notification.message}</span>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
