<script lang="ts">
	export let name: string;
	export let value: string | number | boolean | null;
	export let placeholder: string = '';
	export let className: string = '';
</script>

<select {name} {placeholder} class="select select-bordered {className}" bind:value>
	<slot />
</select>
