<script lang="ts">
	export let name: string;
	export let value: string;
	export let placeholder: string = '';
	export let className: string = '';
</script>

<input type="text" {name} {placeholder} class="input input-bordered {className}" bind:value />
