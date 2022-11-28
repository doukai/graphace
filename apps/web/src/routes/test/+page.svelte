<script lang="ts">
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: ({ QueryUserConnection } = data);
</script>
