<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import type { Query_group_Store } from '~/lib/stores/query/query_group_store';
	import type { Mutation_group_Store } from '~/lib/stores/mutation/mutation_group_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { MutationGroupArgs } from '~/lib/types/schema';
	import { LL, locale } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: query_group_Store = data.query_group_Store as Query_group_Store;
	$: node = $query_group_Store.response.data?.group;
	$: mutation_group_Store = data.mutation_group_Store as Mutation_group_Store;

	let value = {};
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
						errors = buildGraphQLErrors(result.errors);
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

<Card>
	<CardBody>
		<GroupForm
			showSaveButton
			showRemoveButton
			showBackButton={$canBack}
			bind:value
			{errors}
			isFetching={$query_group_Store.isFetching}
			isMutating={$validator.isValidating || $mutation_group_Store.isFetching}
			fields={{
				name: {
					readonly: !auth('Group::name::WRITE'),
					disabled: !auth('Group::name::WRITE'),
					hidden: !auth('Group::name::READ')
				},
				description: {
					readonly: !auth('Group::description::WRITE'),
					disabled: !auth('Group::description::WRITE'),
					hidden: !auth('Group::description::READ')
				},
				path: {
					readonly: !auth('Group::path::WRITE'),
					disabled: !auth('Group::path::WRITE'),
					hidden: !auth('Group::path::READ')
				},
				deep: {
					readonly: !auth('Group::deep::WRITE'),
					disabled: !auth('Group::deep::WRITE'),
					hidden: !auth('Group::deep::READ')
				},
				parentId: {
					readonly: !auth('Group::parentId::WRITE'),
					disabled: !auth('Group::parentId::WRITE'),
					hidden: !auth('Group::parentId::READ')
				},
				parent: {
					readonly: !auth('Group::parent::WRITE'),
					disabled: !auth('Group::parent::WRITE'),
					hidden: !auth('Group::parent::READ')
				},
				subGroups: {
					readonly: !auth('Group::subGroups::WRITE'),
					disabled: !auth('Group::subGroups::WRITE'),
					hidden: !auth('Group::subGroups::READ')
				},
				users: {
					readonly: !auth('Group::users::WRITE'),
					disabled: !auth('Group::users::WRITE'),
					hidden: !auth('Group::users::READ')
				},
				roles: {
					readonly: !auth('Group::roles::WRITE'),
					disabled: !auth('Group::roles::WRITE'),
					hidden: !auth('Group::roles::READ')
				},
				realm: {
					readonly: !auth('Group::realm::WRITE'),
					disabled: !auth('Group::realm::WRITE'),
					hidden: !auth('Group::realm::READ')
				}
			}}
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
			on:goto={(e) => to(`/${$locale}/group/${e.detail.path}`, e.detail.name)}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
