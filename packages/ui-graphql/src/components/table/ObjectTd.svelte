<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Link } from '@steeze-ui/heroicons';
	import type { Errors } from '@graphace/commons/types';
	import LL from '$i18n/i18n-svelte';

	export let path: string;
	export let name: string;
	export let errors: Errors | undefined = undefined;

	const dispatch = createEventDispatcher<{
		gotoField: { path: string; name: string };
	}>();
</script>

<td>
	<div class={errors ? 'border-2 border-error rounded' : ''}>
		<div class="tooltip" data-tip={$LL.uiGraphql.table.editBtn()}>
			<button
				class="btn btn-square btn-xs btn-ghost"
				on:click={(e) => {
					e.preventDefault();
					dispatch('gotoField', { path, name });
				}}
			>
				<Icon src={Link} class="h-5 w-5" />
			</button>
		</div>
	</div>
</td>
