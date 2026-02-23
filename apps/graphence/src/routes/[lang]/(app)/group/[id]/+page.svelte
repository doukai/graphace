<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, Breadcrumbs, toast, modal } from '@graphace/ui';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import type { Query_group_Store } from '~/lib/stores/query/query_group_store';
	import type { Mutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { MutationGroupArgs, GroupInput } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_group_Store = data.query_group_Store as Query_group_Store;
	$: node = $query_group_Store.response.data?.group;
	$: mutation_group_Store = data.mutation_group_Store as Mutation_group_Store;

	let value: GroupInput = {};
	let errors: Record<string, Errors> = {};

	$: if (node && Object.keys(node).length > 0) {
		value = node;
	}

	const mutation = (args: MutationGroupArgs) => {
		validate('Mutation_group_Arguments', args)
			.then((data) => {
				errors = {};
				mutation_group_Store.fetch(args).then((result) => {
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
				<a href={undefined} on:click|preventDefault={(e) => to(`/${$locale}/group`)}>
					<span class="badge badge-outline">{$LL.graphql.objects.Group.name()}</span>
				</a>
			</li>
			<li>
				<span class="badge badge-neutral">
					{value?.id != null
						? $LL.graphence.path.edit({ name: $LL.graphql.objects.Group.name() })
						: $LL.graphence.path.create({ name: $LL.graphql.objects.Group.name() })}
				</span>
			</li>
		</Breadcrumbs>
		<GroupForm
			showSaveButton={auth('Group::*::WRITE')}
			showRemoveButton={auth('Group::isDeprecated::WRITE')}
			showBackButton={$canBack}
			bind:value
			{errors}
			isFetching={$query_group_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_group_Store.isFetching}
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
			on:goto={(e) => to(`/${$locale}/group/${e.detail.path}`)}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
