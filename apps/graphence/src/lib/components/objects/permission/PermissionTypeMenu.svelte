<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { GraphQLError } from '@graphace/graphql';
	import type { Operator } from '~/lib/types/schema';
	import LL from '$i18n/i18n-svelte';

	export let typeNames: (string | null | undefined)[] | null | undefined;
	export let totalCount: number;
	export let typeName: string | null | undefined;
	export let activeTypeName: string | null | undefined;

	const dispatch = createEventDispatcher<{
		fetch: {
			args: {
				first: number;
				offset: number;
				type: { opr: Operator; val: string } | undefined;
			};
			then: (
				data:
					| { typeNames: (string | null | undefined)[] | null | undefined; totalCount: number }
					| null
					| undefined
			) => void;
			catch: (errors: GraphQLError[]) => void;
		};
	}>();

	let pageNumber: number = 1;
	let pageSize: number = 10;
	$: pageCount =
		totalCount % pageSize == 0 ? ~~(totalCount / pageSize) : ~~(totalCount / pageSize) + 1;

	const queryPage = () => {
		dispatch('fetch', {
			args: {
				first: pageSize,
				offset: (pageNumber - 1) * pageSize,
				type: typeName ? { val: typeName } : undefined
			},
			then: (data) => {},
			catch: (errors) => {
				console.error(errors);
			}
		});
	};
</script>

<ul class="menu">
	{#if typeNames}
		{#each typeNames as typeName}
			<li>
				<a
					class={typeName === activeTypeName ? 'active' : ''}
					href={null}
					on:click|preventDefault={(e) => {
						activeTypeName = typeName;
					}}
				>
					{typeName}
				</a>
			</li>
		{/each}
	{/if}
</ul>
<div class="divider" />
<div class="flex justify-center join">
	<button
		class="join-item btn {pageNumber - 1 ? '' : 'btn-disabled'}"
		on:click={() => {
			pageNumber = pageNumber - 1;
			queryPage();
		}}
	>
		«
	</button>
	<button class="join-item btn">
		{$LL.ui.pagination.current({ current: pageNumber })}
	</button>
	<button
		class="join-item btn {pageNumber + 1 <= pageCount ? '' : 'btn-disabled'}"
		on:click={() => {
			pageNumber = pageNumber + 1;
			queryPage();
		}}
	>
		»
	</button>
</div>
