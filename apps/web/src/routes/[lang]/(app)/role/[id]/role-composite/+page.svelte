<script lang="ts">
	import { ot, to, urlName, canBack } from '~/lib/stores/useNavigate';
	import { page } from '$app/stores';
	import RoleCompositeConnectionTable from '~/lib/components/objects/role-composite/RoleCompositeConnectionTable.svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import type { MutationTypeRoleCompositeArgs, QueryTypeRoleCompositeConnectionArgs, RoleComposite } from '~/lib/types/schema';
	import { Query_role_roleCompositeStore, Mutation_roleCompositeStore, Mutation_role_roleCompositeStore } from '$houdini';
	import type { PageData } from './$houdini';
	import { validateMutation } from '~/lib/utils';
	import LL from '$i18n/i18n-svelte';
	import { locale } from '$i18n/i18n-svelte';

	export let data: PageData;
	$: urlName($page.url, $LL.graphql.objects.Role.fields.roleComposite.name());
	$: id = data.id as string;
	$: Query_role_roleComposite = data.Query_role_roleComposite as Query_role_roleCompositeStore;
	$: role = $Query_role_roleComposite.data?.role;
	$: nodes = $Query_role_roleComposite.data?.role?.roleCompositeConnection?.edges?.map((edge) => edge?.node);
	$: totalCount = $Query_role_roleComposite.data?.role?.roleCompositeConnection?.totalCount || 0;
	const Mutation_roleComposite = new Mutation_roleCompositeStore();
	const Mutation_role_roleComposite = new Mutation_role_roleCompositeStore();
	let errors: Record<number, Errors> = {};

	const fetch = (
		event: CustomEvent<{
			args: QueryTypeRoleCompositeConnectionArgs;
			then: (data: (RoleComposite | null | undefined)[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		Query_role_roleComposite.fetch({
			variables: { role_id: { val: role?.id }, ...event.detail.args }
		})
			.then((result) => {
				event.detail.then(result.data?.role?.roleCompositeConnection?.edges?.map((edge) => edge?.node));
				if (result.errors) {
					event.detail.catch(result.errors);
				}
			});
	};

	const mutation = (
		event: CustomEvent<{
			args: MutationTypeRoleCompositeArgs;
			update?: boolean;
			then: (data: RoleComposite | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		const row = nodes?.map((node) => node?.id)?.indexOf(event.detail.args.id);
		validateMutation('RoleComposite', event.detail.args, event.detail.update, $locale)
			.then((data) => {
				if (row !== -1 && row !== undefined && errors[row]) {
					errors[row].iterms = {};
				}
				Mutation_roleComposite.mutate({ ...event.detail.args, update: event.detail.update })
					.then((result) => {
						event.detail.then(result?.data?.roleComposite);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
					});
			})
			.catch((validErrors) => {
				if (row !== -1 && row !== undefined) {
					errors[row] = { errors: errors[row]?.errors, iterms: validErrors };
				}
			});
	};

	const parentMutation = (
		event: CustomEvent<{
			args: MutationTypeRoleCompositeArgs[];
			update?: boolean;
			then: (data: RoleComposite[] | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
		}>
	) => {
		validateMutation('Role', { roleComposite: event.detail.args }, true, $locale)
			.then((data) => {
				errors = {};
				Mutation_role_roleComposite.mutate({
					role_id: id,
					role_roleComposite: event.detail.args,
					update: true,
					mergeToList: ['roleComposite']
				})
					.then((result) => {
						event.detail.then(undefined);
						if (result.errors) {
							event.detail.catch(result.errors);
						}
					});
			})
			.catch((validErrors) => {
				errors = validErrors.roleComposite.iterms;
			});
	};

	const edit = (
		event: CustomEvent<{
			id: string;
		}>
	) => {
		to(`../../role-composite/${event.detail.id}`);
	};

	const create = (event: CustomEvent<{}>) => {
		to(`./role-composite/_`);
	};
	
	const gotoField = (event: CustomEvent<{ path: string; name: string; }>) => {
		to(`../../role-composite/${event.detail.path}`);
	};

	const gotoSelect = (event: CustomEvent<{}>) => {
		to(`./role-composite/__`);
	};

	const back = (event: CustomEvent<{}>) => {
		ot();
	};

</script>
<RoleCompositeConnectionTable
	showSaveButton={false}
	showRemoveButton={false}
	showUnbindButton={true}
	showGotoSelectButton={true}
	showBackButton={$canBack}
	{nodes}
	{totalCount}
	{errors}
	isFetching={$Query_role_roleComposite.fetching}
	on:fetch={fetch}
	on:mutation={mutation}
	on:parentMutation={parentMutation}
	on:edit={edit}
	on:create={create}
	on:gotoField={gotoField}
	on:gotoSelect={gotoSelect}
	on:back={back}
/>
