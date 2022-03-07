<script lang="ts">
	export let rowIndex: number;
</script>

<tr class={rowIndex % 2 ? 'bg-gray-50' : 'bg-white'}>
	<slot />
</tr>
