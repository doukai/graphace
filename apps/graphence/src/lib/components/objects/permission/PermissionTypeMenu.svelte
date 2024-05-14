<script lang="ts">
	import { graphql } from '$houdini';
	import LL from '$i18n/i18n-svelte';

	export let typeNames: (string | null | undefined)[] | null | undefined;
	export let totalCount: number;
	export let typeName: string | null | undefined;
	export let activeTypeName: string | null | undefined;
	let pageNumber: number = 1;
	let pageSize: number = 10;
	let pageCount: number = 0;

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

	const queryPage = () => {
		let variables = {
			first: pageSize,
			offset: (pageNumber - 1) * pageSize,
			type: typeName ? { val: typeName } : undefined
		};
		PermissionTypesQuery.fetch({ variables }).then((result) => {
			typeNames = result.data?.permissionConnection?.edges?.map((edge) => edge?.node?.type);
			totalCount = result.data?.permissionConnection?.totalCount || 0;
			pageCount =
				totalCount % pageSize == 0 ? ~~(totalCount / pageSize) : ~~(totalCount / pageSize) + 1;
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
