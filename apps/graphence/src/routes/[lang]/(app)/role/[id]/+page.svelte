<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, Breadcrumbs, toast, modal } from '@graphace/ui';
	import RoleForm from '~/lib/components/objects/role/RoleForm.svelte';
	import type { Query_role_Store } from '~/lib/stores/query/query_role_store';
	import type { Mutation_role_Store } from '~/lib/stores/mutation/mutation_role_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { MutationRoleArgs, RoleInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_role_Store = data.query_role_Store as Query_role_Store;
	$: node = $query_role_Store.response.data?.role;
	$: mutation_role_Store = data.mutation_role_Store as Mutation_role_Store;

	let value: RoleInput = {};
	let errors: Record<string, Errors> = {};

	$: if (node && Object.keys(node).length > 0) {
		value = node;
	}

	const mutation = (args: MutationRoleArgs) => {
		validate('Mutation_role_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_role_Store.fetch(args).then((result) => {
					if (result.errors) {
						console.error(result.errors);
						errors = buildGraphQLErrors(result.errors, data);
						const globalError = buildGlobalGraphQLErrorMessage(result.errors);
						if (globalError) {
							modal.open({
								title: $LL.graphence.message.requestFailed(),
								description: globalError
							});
						}
					} else {
						toast.success($LL.graphence.message.requestSuccess());
						ot();
					}
				});
			})
			.catch((validErrors) => {
				console.error(validErrors);
				errors = validErrors;
			});
	};
</script>

<Card class="max-h-full max-w-full">
	<CardBody class="overflow-y-auto pt-0">
		<Breadcrumbs>
			<li>
				<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/role`)}>
					<span class="badge badge-outline">{$LL.graphql.objects.Role.name()}</span>
				</a>
			</li>
			<li>
				<span class="badge badge-neutral">
					{value?.id != null
						? $LL.graphence.path.edit({ name: $LL.graphql.objects.Role.name() })
						: $LL.graphence.path.create({ name: $LL.graphql.objects.Role.name() })}
				</span>
			</li>
		</Breadcrumbs>
		<RoleForm
			showSaveButton={auth('Role::*::WRITE')}
			showRemoveButton={auth('Role::isDeprecated::WRITE')}
			showBackButton={$canBack}
			bind:value
			{errors}
			isFetching={$query_role_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_role_Store.isFetching}
			on:save={(e) => {
				if (e.detail.value) {
					mutation(e.detail.value);
				}
			}}
			on:remove={(e) => {
				if (e.detail.value) {
					modal.open({
						title: $LL.graphence.components.modal.removeModalTitle(),
						confirm: () => {
							mutation({
								where: { id: { val: e.detail.value?.id } },
								isDeprecated: true
							});
							return true;
						}
					});
				}
			}}
			on:goto={(e) => to(`/${$locale}/role/${e.detail.path}`)}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
