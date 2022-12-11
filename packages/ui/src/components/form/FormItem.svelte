<script lang="ts">
	import { nanoid } from 'nanoid';
	export let label: string;
	const id = nanoid();
</script>

<div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
	<div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
		<label for={id} class="block text-sm font-medium sm:mt-px sm:pt-2">
			{label}
		</label>
		<div class="mt-1 sm:mt-0 sm:col-span-2">
			<slot {id} />
		</div>
	</div>
</div>
<div class="divider" />
