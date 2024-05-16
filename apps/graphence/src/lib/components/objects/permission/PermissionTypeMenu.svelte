<script lang="ts">
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { graphql } from '$houdini';
	import type { TranslationFunctions } from '$i18n/i18n-types';
	import type { PermissionTypesPageQueryVariables } from './$houdini';

	export let typeName: string | null | undefined;
	export let activeTypeName: string | null | undefined;
	const LL = getContext('LL') as Readable<TranslationFunctions>;

	let pageNumber: number = 1;
	let pageSize: number = 10;

	export const _PermissionTypesPageQueryVariables: PermissionTypesPageQueryVariables = ({
		props
	}) => {
		return { first: 10 };
	};

	const PermissionTypesPageQuery = graphql(`
		query PermissionTypesPageQuery($type: StringExpression, $first: Int, $offset: Int) @load {
			permissionConnection(type: $type, first: $first, offset: $offset, groupBy: ["type"]) {
				totalCount
				edges {
					node {
						type
					}
				}
			}
		}
	`);

	$: typeNames = $PermissionTypesPageQuery.data?.permissionConnection?.edges?.map(
		(edge) => edge?.node?.type
	);
	$: totalCount = $PermissionTypesPageQuery.data?.permissionConnection?.totalCount || 0;
	$: pageCount =
		totalCount % pageSize == 0 ? ~~(totalCount / pageSize) : ~~(totalCount / pageSize) + 1;

	export const queryPage = (typeName?: string | null | undefined) => {
		PermissionTypesPageQuery.fetch({
			variables: {
				first: pageSize,
				offset: (pageNumber - 1) * pageSize,
				type: typeName ? { opr: 'LK', val: `%${typeName}%` } : undefined
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
			queryPage(typeName);
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
			queryPage(typeName);
		}}
	>
		»
	</button>
</div>
