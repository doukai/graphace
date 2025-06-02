<script lang="ts">
	import Gb4x3 from '~icons/flag/gb-4x3';
	import Cn4x3 from '~icons/flag/cn-4x3';

	const icons: Record<string, any> = {
		'gb-4x3': Gb4x3,
		'cn-4x3': Cn4x3
	};

	export let icon: string;
	export let style: string | undefined = undefined;
</script>

<svelte:component this={icons[icon]} {style} />
