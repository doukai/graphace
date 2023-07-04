<script lang="ts">
	export let className = '';
</script>

<div class="overflow-x-auto">
	<table class="table table-zebra table-pin-rows table-pin-cols {className}">
		<slot />
	</table>
</div>
