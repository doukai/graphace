<script lang="ts">
	export let title: string;
	export let detail: string = null;
</script>

<div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
	<div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
		<div>
			<h3 class="text-lg leading-6 font-medium text-gray-900">{title}</h3>
			{#if detail}
				<p class="mt-1 max-w-2xl text-sm text-gray-500">
					{detail}
				</p>
			{/if}
		</div>
		<slot />
	</div>
</div>
