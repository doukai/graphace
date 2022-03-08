<script lang="ts">
	export let color: string = 'indigo';
</script>

<button
	type="button"
	class="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-{color}-600 hover:bg-{color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-{color}-500"
	on:click
>
	<slot />
</button>
