<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
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
	$: urlName($page.url, 'realm');
	$: node = data.node as MutationTypeRealmArgs;
	$: errors = data.errors as Record<string, Errors>;

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRealmArgs;
			update?: boolean;
			then: (data: Realm | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		node = event.detail.args;
	};

	const save = (event: CustomEvent<{}> ) => {
		ot({
			node: updateNodeParam($page.url, node),
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

<RealmCreateForm showGotoSelectButton={true} showBackButton={$canBack} {node} {errors} on:mutation={mutation} on:save={save} on:back={back} on:gotoField={gotoField} on:gotoSelect={gotoSelect} />