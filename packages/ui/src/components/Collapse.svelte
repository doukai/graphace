<script lang="ts">
	export let title: string = '';
	export let index: number = 0;
	export let open: boolean = true;
</script>

<div
	tabIndex={index}
	class="collapse collapse-arrow border border-base-200 bg-base-200 rounded-box"
>
	<input type="checkbox" bind:checked={open} />
	<div class="collapse-title text-xl font-medium">{title}</div>
	<div class="collapse-content">
		<slot />
	</div>
</div>
