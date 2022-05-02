<script lang="ts">
	export let name: string;
	export let value: number;
	export let placeholder: string = '';
	export let className: string = '';
</script>

<input type="number" {name} {placeholder} class="input input-bordered {className}" bind:value />
