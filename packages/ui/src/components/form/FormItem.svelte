<script lang="ts">
	import { nanoid } from 'nanoid';
	export let label: string;
	const id = nanoid();
</script>

<div class="form-control w-full">
	<label for={id} class="label">
		<span class="label-text text-base-content">{label}</span>
	</label>
	<slot {id} />
</div>
