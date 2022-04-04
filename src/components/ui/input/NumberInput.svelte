<script lang="ts">
	export let name: string;
	export let value: any;
	export let placeholder: string = '';
</script>

<input type="number" {name} {placeholder} class="input input-bordered w-full max-w-xs" bind:value />
