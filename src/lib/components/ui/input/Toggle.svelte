<script lang="ts">
	export let name: string;
	export let value: boolean;
</script>

<input
	{name}
	type="checkbox"
	class="toggle mt-3"
	checked={value}
	on:click={(e) => {
		value = !value;
	}}
/>
