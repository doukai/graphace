<script lang="ts">
	export let label: string;
	export let forName: string = '';
</script>

<div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
	<div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
		<label for={forName} class="block text-sm font-medium sm:mt-px sm:pt-2">
			{label}
		</label>
		<div class="mt-1 sm:mt-0 sm:col-span-2">
			<slot />
		</div>
	</div>
</div>
<div class="divider" />
