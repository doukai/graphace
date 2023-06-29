<script lang="ts" context="module">
	import { writable, derived, type Writable } from 'svelte/store';
	import { nanoid } from 'nanoid';

	type NotificationComponent = {
		id: string;
		props: NotificationProps;
	};

	type NotificationProps = {
		type: string;
		message: string;
		timeout: number;
	};

	const notificationsStore = writable<NotificationComponent[]>([]);

	function send(message: string, type: string, timeout = 3000) {
		notificationsStore.update((notification) => {
			return [...notification, { id: nanoid(), props: { type, message, timeout } }];
		});
	}

	function createNotificationStore() {
		const notifications = derived<Writable<NotificationComponent[]>, NotificationComponent[]>(
			notificationsStore,
			($notificationsStore, set) => {
				set($notificationsStore);
				if ($notificationsStore.length > 0) {
					const timer = setTimeout(() => {
						notificationsStore.update((notifications) => {
							notifications.shift();
							return notifications;
						});
					}, $notificationsStore[0].props.timeout);
					return () => {
						clearTimeout(timer);
					};
				}
			}
		);

		const { subscribe } = notifications;

		return {
			subscribe,
			send,
			default: (msg: string, timeout = 3000) => send(msg, null, timeout),
			info: (msg: string, timeout = 3000) => send(msg, 'info', timeout),
			success: (msg: string, timeout = 3000) => send(msg, 'success', timeout),
			warning: (msg: string, timeout = 3000) => send(msg, 'warning', timeout),
			error: (msg: string, timeout = 3000) => send(msg, 'error', timeout)
		};
	}

	export const notifications = createNotificationStore();
</script>

<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		InformationCircle,
		CheckCircle,
		ExclamationTriangle,
		XCircle
	} from '@steeze-ui/heroicons';

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
				<div class="alert {alertClassName(notification.props.type)} shadow-lg">
					<div>
						{#if notification.props.type === 'info'}
							<Icon src={InformationCircle} class="h-5 w-5" />
						{:else if notification.props.type === 'success'}
							<Icon src={CheckCircle} class="h-5 w-5" />
						{:else if notification.props.type === 'warning'}
							<Icon src={ExclamationTriangle} class="h-5 w-5" />
						{:else if notification.props.type === 'error'}
							<Icon src={XCircle} class="h-5 w-5" />
						{:else}
							<Icon src={InformationCircle} class="h-5 w-5" />
						{/if}
						<span>{notification.props.message}</span>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
