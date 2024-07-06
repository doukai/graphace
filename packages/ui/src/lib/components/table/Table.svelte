<script lang="ts">
	export let className = 'table-zebra';
</script>

<div class="overflow-x-auto">
	<table class="table table-pin-rows table-pin-cols {className}">
		<slot />
	</table>
</div>
