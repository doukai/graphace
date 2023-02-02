<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Link } from '@steeze-ui/heroicons';
	import LL from '~/i18n/i18n-svelte';

	export let path: string;
	export let name: string;

	const dispatch = createEventDispatcher<{
		gotoField: { path: string; name: string };
	}>();
</script>

<td>
	<div class="tooltip" data-tip={$LL.components.graphql.table.editBtn()}>
		<button
			class="btn btn-square btn-xs btn-ghost"
			on:click={(e) => {
				e.preventDefault();
				dispatch('gotoField', { path, name });
			}}
		>
			<Icon src={Link} solid class="h-5 w-5" />
		</button>
	</div>
</td>
