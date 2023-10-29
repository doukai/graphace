<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Errors } from '@graphace/commons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Link } from '@steeze-ui/heroicons';
	import LL from '$i18n/i18n-svelte';

	export let path: string;
	export let name: string;
	export let errors: Errors | undefined = undefined;
	let blur = false;

	const dispatch = createEventDispatcher<{
		gotoField: { path: string; name: string };
	}>();
</script>

<td>
	<div
		class={errors ? 'tooltip tooltip-open tooltip-error hover:z-30' : ''}
		data-tip={errors?.errors?.map((error) => error.message).join(', ')}
	>
		<div class="tooltip hover:z-30" data-tip={$LL.uiGraphql.table.editBtn()}>
			<button
				class="btn btn-square btn-xs btn-ghost"
				on:click|preventDefault={(e) => {
					dispatch('gotoField', { path, name });
				}}
				on:blur={() => (blur = true)}
			>
				<Icon src={Link} class="h-5 w-5" />
			</button>
		</div>
	</div>
</td>
