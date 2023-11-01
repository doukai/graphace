<script lang="ts">
	import { graphql } from '$houdini';
	import { notifications } from '@graphace/ui';
	import LL from '$i18n/i18n-svelte';

	export let typeName: string | null | undefined;
	export let activeTypeName: string | null | undefined;
	let pageNumber: number = 1;
	let pageSize: number = 10;

	const PermissionTypesQuery = graphql(`
		query PermissionTypesQuery($type: StringExpression, $first: Int, $offset: Int) {
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

	$: typeNames = $PermissionTypesQuery.data?.permissionConnection?.edges?.map(
		(edge) => edge?.node?.type
	);

	$: totalCount = $PermissionTypesQuery.data?.permissionConnection?.totalCount || 0;

	$: if (!activeTypeName && typeNames && typeNames?.length > 0) {
		activeTypeName = typeNames[0];
	}

	$: pageCount =
		totalCount % pageSize == 0 ? ~~(totalCount / pageSize) : ~~(totalCount / pageSize) + 1;

	$: queryPage(typeName);

	const queryPage = (typeName?: string | null | undefined) => {
		let variables = {
			first: pageSize,
			offset: (pageNumber - 1) * pageSize,
			type: typeName ? { val: typeName } : undefined
		};
		PermissionTypesQuery.fetch({ variables }).catch((errors) => {
			console.error(errors);
			notifications.error($LL.web.message.requestFailed());
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
