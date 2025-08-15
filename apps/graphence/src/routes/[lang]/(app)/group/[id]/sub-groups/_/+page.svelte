<script lang="ts">
	import type { Errors } from '@graphace/commons';
	import { ot, to, canBack, Card, CardBody, toast, modal } from '@graphace/ui';
	import GroupForm from '~/lib/components/objects/group/GroupForm.svelte';
	import type { Mutation_group_subGroups_Store } from '~/lib/stores/mutation/mutation_group_subGroups_store';
	import {
		validator,
		permissions,
		buildGlobalGraphQLErrorMessage,
		buildGraphQLErrors
	} from '~/utils';
	import type { GroupInput } from '~/lib/types/schema';
	import { LL } from '$i18n/i18n-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { validate } = validator;
	const { auth } = permissions;

	$: id = data.id as string;
	$: mutation_group_subGroups_Store = data.mutation_group_subGroups_Store as Mutation_group_subGroups_Store;

	let value = {};
	let errors: Record<string, Errors> = {};

	const merge = (args: GroupInput) => {
		validate('Mutation_group_Arguments', { where: { id: { val: id } }, subGroups: [args] })
			.then((data) => {
				errors = {};
				mutation_group_subGroups_Store.fetch({
					group_id: id,
					group_subGroups: [args]
				}).then((result) => {
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
				errors = validErrors.subGroups?.iterms[0]?.iterms;
			});
	};
</script>

<Card>
	<CardBody>
		<GroupForm
			showSaveButton={auth('Group::*::WRITE')}
			showBackButton={$canBack}
			bind:value
			{errors}
			isMutating={$validator.isValidating || $mutation_group_subGroups_Store.isFetching}
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
					merge(e.detail.value);
				}
			}}
			on:back={(e) => ot()}
		/>
	</CardBody>
</Card>
