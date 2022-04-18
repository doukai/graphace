<script lang="ts">
	export let name: string;
	export let value: boolean | null;
	export let className: string = '';
</script>

<input
	{name}
	type="checkbox"
	class="toggle mt-3 {className}"
	checked={value}
	on:click={(e) => {
		value = !value;
	}}
/>
