<script lang="ts">
	import { graphql, Operator } from '$houdini';
	import type { PermissionTypesQueryVariables } from './$houdini';
	import MenuLoading from '@graphace/ui/components/menu/MenuLoading.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';

	export let typeName: string | null | undefined;
	export let activeTypeName: string | null | undefined;

	export const _PermissionTypesQueryVariables: PermissionTypesQueryVariables = ({}) => {
		return {
			type: undefined
		};
	};

	const PermissionTypesQuery = graphql(`
		query PermissionTypesQuery($type: StringExpression) @load {
			permissionList(type: $type, groupBy: ["type"]) {
				type
			}
		}
	`);

	$: typeNames = $PermissionTypesQuery.data?.permissionList?.map((permission) => permission?.type);

	$: if (typeName) {
		queryPage();
	}

	const queryPage = () => {
		let variables = {
			type: typeName ? { opr: Operator.LK, val: `%${typeName}%` } : undefined
		};
		PermissionTypesQuery.fetch({ variables }).catch((errors) => {
			console.error(errors);
			notifications.error($LL.web.message.requestFailed());
		});
	};
</script>

{#if $PermissionTypesQuery.fetching}
	<MenuLoading />
{:else}
	<ul class="menu">
		{#if typeNames}
			{#each typeNames as typeName}
				<li>
					<a
						class={typeName === activeTypeName ? 'active' : ''}
						href={null}
						on:click={(e) => {
							e.preventDefault();
							activeTypeName = typeName;
						}}
					>
						{typeName}
					</a>
				</li>
			{/each}
		{/if}
	</ul>
{/if}
