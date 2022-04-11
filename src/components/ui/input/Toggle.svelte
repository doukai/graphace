<script lang="ts">
	export let name: string;
	export let value: boolean | null;
</script>

<input
	{name}
	type="checkbox"
	class="toggle"
	checked={value}
	on:click={(e) => {
		value = !value;
	}}
/>
