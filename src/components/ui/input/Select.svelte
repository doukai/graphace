<script lang="ts">
	export let name: string;
	export let value: any;
	export let placeholder: string = '';
</script>

<select {name} {placeholder} class="select select-bordered w-full max-w-xs" bind:value>
	<slot />
</select>
