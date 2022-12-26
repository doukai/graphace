<script lang="ts">
	import { nanoid } from 'nanoid';
	export let name: string;
	export let value: string | null | undefined;
	export let group: (string | null | undefined)[] | null | undefined;
	export let description: string | undefined = undefined;
	export let id: string = nanoid();
</script>

<div class="relative flex items-start">
	<div class="flex items-center h-5">
		<input type="checkbox" {id} bind:group class="checkbox" {value} />
	</div>
	<div class="ml-3 text-sm">
		<label for={id} class="font-medium">{name}</label>
		{#if description}
			<p>{description}</p>
		{/if}
	</div>
</div>
