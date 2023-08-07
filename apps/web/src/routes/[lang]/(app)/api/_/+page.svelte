<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import ApiCreateForm from '~/lib/components/objects/api/ApiCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Mutation_apiStore } from '$houdini';
	import type { MutationTypeApiArgs, Api } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Api.name(), PageType.CREATE);
	$: node = data.node as MutationTypeApiArgs;
	$: errors = data.errors as Record<number, Errors>;

	const Mutation_api = new Mutation_apiStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeApiArgs;
			update?: boolean;
			then: (data: Api | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Api', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				Mutation_api.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.api);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`./${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<ApiCreateForm showRemoveButton={false} showBackButton={$canBack} {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
