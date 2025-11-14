<script lang="ts" context="module">
	export type TabInfo = {
		id: string | undefined;
		title: string;
	};
</script>

<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { createTabs, melt } from '@melt-ui/svelte';

	export let value: string = '';
	export let tabs: TabInfo[] = [];
	export let zIndex: number | undefined = 0;
	let className: string | undefined = '';
	export { className as class };

	const contextClass = getContext<string>('ui.tab') || '';

	const dispatch = createEventDispatcher<{
		change: { origin: string; value: string };
	}>();

	const {
		elements: { root, list, content, trigger },
		states: { value: curr }
	} = createTabs({
		defaultValue: value,
		onValueChange: ({ curr, next }) => {
			dispatch('change', { origin: curr, value: next });
			value = next;
			return next;
		}
	});
</script>

<div data-element="tabs" data-part="root" use:melt={$root} class="z-[{zIndex}]">
	<div data-part="list" use:melt={$list} class="tabs">
		{#each tabs as tab}
			<a
				data-part="link"
				href={undefined}
				on:click={(e) => e.preventDefault()}
				use:melt={$trigger(tab.id)}
				class="tab {contextClass} {className} {$curr === tab.id ? 'tab-active' : ''}"
			>
				{tab.title}
			</a>
		{/each}
	</div>
	<slot {content} />
</div>
