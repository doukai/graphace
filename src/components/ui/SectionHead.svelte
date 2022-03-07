<script lang="ts">
	export let title: string;
</script>

<div class="max-w-wxl mx-auto py-4 px-4 sm:px-6 lg:px-8">
	<div class="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
		<h3 class="text-lg leading-6 font-medium text-gray-900">{title}</h3>
		<div class="mt-3 flex sm:mt-0 sm:ml-4">
			<slot />
		</div>
	</div>
</div>
