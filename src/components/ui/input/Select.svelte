<script lang="ts">
	export let name: string;
	export let value: any;
</script>

<select
	{name}
	class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
	bind:value
>
	<slot />
</select>
