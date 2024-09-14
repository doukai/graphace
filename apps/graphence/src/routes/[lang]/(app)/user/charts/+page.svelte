<script lang="ts">
	import { Card } from '@graphace/ui';
	import UserBar from '~/lib/components/objects/user/UserBar.svelte';
	import type { PageData } from './$houdini';

	export let data: PageData;
</script>

<Card>
	<UserBar />
</Card>
