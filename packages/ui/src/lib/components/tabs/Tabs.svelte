<script lang="ts" context="module">
	export type TabInfo = {
		id: string;
		title: string;
	};
</script>

<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { createTabs, melt } from '@melt-ui/svelte';
	import { zIndex } from '~';

	export let value: string | undefined = undefined;
	export let triggers: TabInfo[] = [];
	let className: string | undefined = undefined;
	export { className as class };

	const contextClass = getContext<string>('ui.tabs') || '';

	const dispatch = createEventDispatcher<{
		change: { value: string };
	}>();

	const {
		elements: { root, list, content, trigger },
		states: { value: curr }
	} = createTabs({
		defaultValue: value,
		onValueChange: ({ curr, next }) => {
			if (next) {
				dispatch('change', { value: next });
			}
			return next;
		}
	});

	$: value = $curr;
</script>

<div use:melt={$root} class="z-[{zIndex}]">
	<div use:melt={$list} class="tabs {className} {contextClass}">
		{#each triggers as triggerItem}
			<a
				href={undefined}
				use:melt={$trigger(triggerItem.id)}
				class="tab {$curr === triggerItem.id ? 'tab-active' : ''}"
			>
				{triggerItem.title}
			</a>
		{/each}
		<slot {content} />
	</div>
</div>
