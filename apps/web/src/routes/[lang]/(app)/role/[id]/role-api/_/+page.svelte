<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleApiCreateForm from '~/lib/components/objects/role-api/RoleApiCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Mutation_role_roleApiStore } from '$houdini';
	import type { MutationTypeRoleApiArgs, RoleApi } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.roleApi.name(), PageType.CREATE);
	$: node = data.node as MutationTypeRoleApiArgs;
	$: id = data.id as string;
	$: errors = data.errors as Record<string, Errors>;

	const Mutation_role_roleApi = new Mutation_role_roleApiStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleApiArgs;
			update?: boolean;
			then: (data: RoleApi | null | undefined) => void;
			catch: (errors: Errors) => void;
		}>
	) => {
		validate('Role', { roleApi: [event.detail.args] }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_role_roleApi.mutate({
					role_id: id,
					role_roleApi: [event.detail.args],
					update: true,
					mergeToList: ['roleApi']
				})
					.then((result) => {
						event.detail.then(undefined);
					})
					.catch((errors) => {
						event.detail.catch(errors);
					});
			})
			.catch((validErrors) => {
				errors = validErrors.roleApi.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../../role-api/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<RoleApiCreateForm showBackButton={$canBack} {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
