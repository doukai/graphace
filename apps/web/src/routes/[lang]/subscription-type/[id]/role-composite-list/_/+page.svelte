<script lang="ts">
	import { ot, to } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleCompositeCreateForm from '~/lib/components/objects/role-composite/RoleCompositeCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Mutation_subscriptionType_roleCompositeListStore } from '$houdini';
	import type { MutationTypeRoleCompositeArgs, RoleComposite } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import { locale } from '~/i18n/i18n-svelte';

	export let data: PageData;
	$: node = data.node as MutationTypeRoleCompositeArgs;
	$:  = data. as string;
	$: errors = data.errors as Record<string, Errors>;

	const Mutation_subscriptionType_roleCompositeList = new Mutation_subscriptionType_roleCompositeListStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleCompositeArgs;
			update?: boolean;
			then: (data: RoleComposite | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('RoleComposite', event.detail.args, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_subscriptionType_roleCompositeList.mutate({
					subscriptionType_id: ,
					subscriptionType_roleCompositeList: [event.detail.args],
					update: true,
					mergeToList: ['roleCompositeList']
				})
					.then((result) => {
						event.detail.then(null);
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

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../../role-composite/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<RoleCompositeCreateForm {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
