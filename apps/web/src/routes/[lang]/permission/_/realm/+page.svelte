<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RealmCreateForm from '~/lib/components/objects/realm/RealmCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import type {
		MutationTypeRealmArgs,
		Realm
	} from '~/lib/types/schema';
	import { updateNodeParam, updateErrorsParam, getChildPathParam, getNodeParam, getErrorsParam, getPathParam } from '@graphace/commons/utils/url-util';
	import type { PageData } from './$houdini';

	export let data: PageData;
	$: node = data.node as MutationTypeRealmArgs | null | undefined;
	$: errors = data.errors as Record<string, Errors>;

	const mutation = (event: CustomEvent<{ node: MutationTypeRealmArgs | null | undefined}> ) => {
		node = event.detail.node;
	};

	const save = (event: CustomEvent<{ node: MutationTypeRealmArgs | null | undefined}> ) => {
		ot({
			node: updateNodeParam($page.url, event.detail.node),
			errors: updateErrorsParam($page.url, errors)
		});
	};

	const back = (event: CustomEvent<{}>) => {
		ot({
			node: getNodeParam($page.url),
			errors: getErrorsParam($page.url)
		});
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../realm/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./realm/__`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getPathParam($page.url)
		});
	};
</script>

<RealmCreateForm showGotoSelectButton={true} {node} {errors} on:mutation={mutation} on:save={save} on:back={back} on:gotoField={gotoField} on:gotoSelect={gotoSelect} />