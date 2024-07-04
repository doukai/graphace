<script lang="ts">
	import { page } from '$app/stores';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql';
	import { Card, ot, to, urlName, canBack } from '@graphace/ui';
	import PermissionTypeMenuCard from '~/lib/components/objects/permission/PermissionTypeMenuCard.svelte';
	import PermissionFieldSelectTable from '~/lib/components/objects/permission/PermissionFieldSelectTable.svelte';
	import type { PageData } from './$houdini';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.permissions.name());
	$: id = data.id as string;
	let query: (typeName?: string | null | undefined) => void;

	const back = (event: CustomEvent<{}>) => {
		ot();
	};
</script>

<div class="flex xl:items-start xl:flex-row xl:gap-2">
	<div class="hidden xl:flex xl:basis-1/5">
		<PermissionTypeMenuCard on:query={(e) => query(e.detail.typeName)} />
	</div>
	<div class="w-full xl:basis-4/5">
		<Card>
			<PermissionFieldSelectTable
				showBackButton={$canBack}
				bind:roleId={id}
				on:back={back}
				bind:query
			/>
		</Card>
	</div>
</div>
