<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import ApiCreateForm from '~/lib/components/objects/api/ApiCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { MutationTypeApiArgs, Api } from '~/lib/types/schema';
	import type { Errors } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam, getNodeParam, getErrorsParam } from '@graphace/commons/utils/url-util';
	import type { PageData } from './$houdini';
	import LL from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.apis.name(), PageType.CREATE);
	$: node = data.node as MutationTypeApiArgs;
	$: errors = data.errors as Record<string, Errors>;

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeApiArgs;
			then: (data: Api | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		ot({
			node: updateNodeParam($page.url, event.detail.args),
			errors: updateErrorsParam($page.url, errors)
		});
	};

	const back = (event: CustomEvent<{}>) => {
		ot({
			node: getNodeParam($page.url),
			errors: getErrorsParam($page.url)
		});
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../../api/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<ApiCreateForm showBackButton={$canBack} {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
