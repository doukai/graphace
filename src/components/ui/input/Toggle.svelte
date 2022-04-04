<script lang="ts">
	export let value: any;
</script>

<input
	type="checkbox"
	class="toggle"
	checked={value}
	on:click={(e) => {
		value = !value;
	}}
/>
