<script lang="ts">
	import { ot, to, urlName, canBack, PageType } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleCreateForm from '~/lib/components/objects/role/RoleCreateForm.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { updateNodeParam, updateErrorsParam, getChildPathParam } from '@graphace/commons/utils/url-util';
	import { Mutation_role_compositesStore } from '$houdini';
	import type { MutationTypeRoleArgs, Role } from '~/lib/types/schema';
	import type { PageData } from './$houdini';
	import { validate } from '@graphace/graphql/schema/json-schema';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.composites.name(), PageType.CREATE);
	$: node = data.node as MutationTypeRoleArgs;
	$: id = data.id as string;
	$: errors = data.errors as Record<string, Errors>;

	const Mutation_role_composites = new Mutation_role_compositesStore();

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleArgs;
			update?: boolean;
			then: (data: Role | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validate('Role', { composites: [event.detail.args] }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_role_composites.mutate({
					role_id: id,
					role_composites: [event.detail.args],
					update: true,
					mergeToList: ['composites']
				})
					.then((result) => {
						event.detail.then(undefined);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.composites.iterms[0].iterms;
			});
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

	const gotoField = (event: CustomEvent<{ path: string; name: string }>) => {
		to(`../../../role/${event.detail.path}`, {
			node: updateNodeParam($page.url, node),
			errors: updateErrorsParam($page.url, errors),
			path: getChildPathParam($page.url, event.detail.name)
		});
	};
</script>

<RoleCreateForm showBackButton={$canBack} {node} {errors} on:mutation={mutation} on:back={back} on:gotoField={gotoField} />
