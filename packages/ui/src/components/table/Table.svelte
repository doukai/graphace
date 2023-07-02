<script lang="ts">
	export let className = '';
</script>

<div class="shadow-xl overflow-x-auto">
	<table class="table table-zebra {className}">
		<slot />
	</table>
</div>
