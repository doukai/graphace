<script lang="ts" context="module">
	import { writable, type Unsubscriber, type Subscriber } from 'svelte/store';
	import { nanoid } from 'nanoid';

	type NotificationComponent = {
		id: string;
		props: NotificationProps;
	};

	type NotificationProps = {
		type: string | undefined;
		message: string;
		timeout: number;
		callback?: () => void;
	};

	function createNotificationStore() {
		const notifications = writable<NotificationComponent[]>([]);

		notifications.subscribe(($notifications) => {
			if ($notifications.length > 0) {
				const lastNotification = $notifications.at(-1);
				const timer = setTimeout(() => {
					notifications.update(($notifications) =>
						$notifications.filter((notification) => notification.id !== lastNotification.id)
					);
					if (lastNotification.props.callback) {
						lastNotification.props.callback();
					}
				}, lastNotification.props.timeout);
				return () => {
					clearTimeout(timer);
				};
			}
		});

		const send = (
			message: string,
			type: string | undefined,
			timeout = 3000,
			callback?: () => void
		) => {
			notifications.update((notification) => {
				return [...notification, { id: nanoid(), props: { type, message, timeout, callback } }];
			});
		};

		const { subscribe } = notifications;

		return {
			subscribe,
			send,
			default: (msg: string, timeout = 3000, callback?: () => void) =>
				send(msg, undefined, timeout, callback),
			info: (msg: string, timeout = 3000, callback?: () => void) =>
				send(msg, 'info', timeout, callback),
			success: (msg: string, timeout = 3000, callback?: () => void) =>
				send(msg, 'success', timeout, callback),
			warning: (msg: string, timeout = 3000, callback?: () => void) =>
				send(msg, 'warning', timeout, callback),
			error: (msg: string, timeout = 3000, callback?: () => void) =>
				send(msg, 'error', timeout, callback)
		};
	}

	export const notifications: {
		subscribe: (
			this: void,
			run: Subscriber<NotificationComponent[]>,
			invalidate?: (value?: NotificationComponent[]) => void
		) => Unsubscriber;
		send: (message: string, type: string, timeout?: number, callback?: () => void) => void;
		default: (msg: string, timeout?: number, callback?: () => void) => void;
		info: (msg: string, timeout?: number, callback?: () => void) => void;
		success: (msg: string, timeout?: number, callback?: () => void) => void;
		warning: (msg: string, timeout?: number, callback?: () => void) => void;
		error: (msg: string, timeout?: number, callback?: () => void) => void;
	} = createNotificationStore();
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

	const alertClassName = (alertType: string | undefined) => {
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

<div
	class="fixed inset-0 z-[999] flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
>
	<div class="w-full flex flex-col items-center space-y-4">
		{#each $notifications as notification (notification.id)}
			<div class="min-w-[50vw]" animate:flip transition:fly={{ y: 30 }}>
				<div class="alert {alertClassName(notification.props.type)} shadow-lg">
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
		{/each}
	</div>
</div>
