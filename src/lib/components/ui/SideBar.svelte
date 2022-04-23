<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="navbar text-neutral-content">
	<a class="btn btn-ghost normal-case text-xl" href={null}>
		<Icon class="h-8 mr-3 w-auto" icon="logos:graphql" />
		Graphace
	</a>
</div>
<div class="flex-1 flex flex-col overflow-y-auto">
	<slot />
</div>
