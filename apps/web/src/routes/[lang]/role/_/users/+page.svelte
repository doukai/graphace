<script lang="ts">
	import { ot, to, canBack, urlName } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import UserCreateTable from '~/lib/components/objects/user/UserCreateTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type { MutationTypeUserArgs } from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam, getNodeParam, getErrorsParam, getPathParam } from '@graphace/commons/utils/url-util';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: urlName($page.url, 'users');
	$: nodes = data.nodes as (MutationTypeUserArgs | null | undefined)[];
	$: errors = data.errors as Record<number, Errors>;

	const edit = (
		event: CustomEvent<{
			row: number;
		}>
	) => {
		to(`./users/_`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.row)
		});
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./users/_`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, nodes.length)
		});
	};

	const mutation = (event: CustomEvent<{ nodes: (MutationTypeUserArgs | null | undefined)[] | null | undefined}> ) => {
		nodes = [...event.detail.nodes || []];
	};

	const save = (event: CustomEvent<{ nodes: (MutationTypeUserArgs | null | undefined)[] | null | undefined}> ) => {
		ot({
			node: updateNodeParam($page.url, event.detail.nodes),
			errors: updateErrorsParam($page.url, errors)
		});
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../user/${event.detail.path}`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./users/__`, {
			node: updateNodeParam($page.url, nodes),
			errors: updateErrorsParam($page.url, errors),
			path: getPathParam($page.url)
		});
	};

	const back = (event: CustomEvent<{}>) => {
		ot({
			node: getNodeParam($page.url),
			errors: getErrorsParam($page.url)
		});
	};
</script>
<UserCreateTable
	showGotoSelectButton={true}
	showBackButton={$canBack}
	{nodes}
	{errors}
	on:edit={edit}
	on:create={create}
	on:mutation={mutation}
	on:save={save}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
