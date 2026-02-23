<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, Breadcrumbs, toast, modal } from '@graphace/ui';
	import PermissionForm from '~/lib/components/objects/permission/PermissionForm.svelte';
	import type { Query_permission_Store } from '~/lib/stores/query/query_permission_store';
	import type { Mutation_permission_Store } from '~/lib/stores/mutation/mutation_permission_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { MutationPermissionArgs, PermissionInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_permission_Store = data.query_permission_Store as Query_permission_Store;
	$: node = $query_permission_Store.response.data?.permission;
	$: mutation_permission_Store = data.mutation_permission_Store as Mutation_permission_Store;

	let value: PermissionInput = {};
	let errors: Record<string, Errors> = {};

	$: if (node && Object.keys(node).length > 0) {
		value = node;
	}

	const mutation = (args: MutationPermissionArgs) => {
		validate('Mutation_permission_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_permission_Store.fetch(args).then((result) => {
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
				<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/permission`)}>
					<span class="badge badge-outline">{$LL.graphql.objects.Permission.name()}</span>
				</a>
			</li>
			<li>
				<span class="badge badge-neutral">
					{value?.id != null
						? $LL.graphence.path.edit({ name: $LL.graphql.objects.Permission.name() })
						: $LL.graphence.path.create({ name: $LL.graphql.objects.Permission.name() })}
				</span>
			</li>
		</Breadcrumbs>
		<PermissionForm
			showSaveButton={auth('Permission::*::WRITE')}
			showRemoveButton={auth('Permission::isDeprecated::WRITE')}
			showBackButton={$canBack}
			bind:value
			{errors}
			isFetching={$query_permission_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_permission_Store.isFetching}
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
			on:goto={(e) => to(`/${$locale}/permission/${e.detail.path}`)}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
