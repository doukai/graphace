<script lang="ts" context="module">
	export type TabInfo = {
		id: string;
		title: string;
	};
</script>

<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { createTabs, melt } from '@melt-ui/svelte';

	export let value: string | undefined = undefined;
	export let tabs: TabInfo[] = [];
	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.tab') || '';

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

<div data-element="tabs" data-part="root" use:melt={$root} class="z-[{zIndex}]">
	<div data-part="list" use:melt={$list} class="tabs">
		{#each tabs as tab}
			<a
				data-part="link"
				href={undefined}
				use:melt={$trigger(tab.id)}
				class="tab {className} {contextClass} {$curr === tab.id ? 'tab-active' : ''}"
			>
				{tab.title}
			</a>
		{/each}
	</div>
	<slot {content} />
</div>
