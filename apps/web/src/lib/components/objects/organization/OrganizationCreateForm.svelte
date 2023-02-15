<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { Form, FormItems, FormButtons } from '@graphace/ui/components/form';
	import { IntItem, StringItem, TimestampItem, IDItem, BooleanItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '~/i18n/i18n-svelte';
	import type { Organization, MutationTypeOrganizationArgs } from '~/lib/types/schema';

	export let node: MutationTypeOrganizationArgs = {};
	export let errors: Record<string, Error> = {};

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeOrganizationArgs;
			then: (data: Organization | null | undefined) => void;
			catch: (error: Error) => void;
		};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			if (node) {
				dispatch('mutation', {
					args: node,
					then: (data) => {
						notifications.success($LL.message.saveSuccess());
						dispatch('back');
					},
					catch: (error) => {
						console.error(error);
						notifications.error($LL.message.saveFailed());
					}
				});
			}
		}
	};

	const remove = (): void => {
		if (node) {
			dispatch('mutation', {
				args: { id: node.id, isDeprecated: true },
				then: (data) => {
					notifications.success($LL.message.removeSuccess());
					dispatch('back');
				},
				catch: (error) => {
					console.error(error);
					notifications.error($LL.message.removeFailed());
				}
			});
		}
	};
</script>

<Form>
	<FormItems title="Organization">
		<IntItem label="aboveId" name="aboveId" bind:value={node.aboveId} error={errors.aboveId} />
		<StringItem label="createGroupId" name="createGroupId" bind:value={node.createGroupId} error={errors.createGroupId} />
		<TimestampItem label="createTime" name="createTime" bind:value={node.createTime} error={errors.createTime} />
		<StringItem label="createUserId" name="createUserId" bind:value={node.createUserId} error={errors.createUserId} />
		<IDItem label="id" name="id" bind:value={node.id} error={errors.id} />
		<BooleanItem label="isDeprecated" name="isDeprecated" bind:value={node.isDeprecated} error={errors.isDeprecated} />
		<StringItem label="name" name="name" bind:value={node.name} error={errors.name} />
		<StringItem label="realmId" name="realmId" bind:value={node.realmId} error={errors.realmId} />
		<TimestampItem label="updateTime" name="updateTime" bind:value={node.updateTime} error={errors.updateTime} />
		<StringItem label="updateUserId" name="updateUserId" bind:value={node.updateUserId} error={errors.updateUserId} />
		<ObjectItem name="userByOrg" path="_/user-by-org" label="userByOrg" error={errors.userByOrg} on:gotoField />
		<ObjectItem name="users" path="_/users" label="users" error={errors.users} on:gotoField />
		<ObjectItem name="usersConnection" path="_/users-connection" label="usersConnection" error={errors.usersConnection} on:gotoField />
		<IntItem label="version" name="version" bind:value={node.version} error={errors.version} />
	</FormItems>
	<FormButtons>
		<button
			class="btn"
			on:click={(e) => {
				e.preventDefault();
				dispatch('back');
			}}
		>
			{$LL.components.graphql.editor.backBtn()}
		</button>
		<button
			class="btn"
			on:click={(e) => {
				e.preventDefault();
				save();
			}}
		>
			{$LL.components.graphql.editor.saveBtn()}
		</button>
		<button
			class="btn btn-outline btn-error"
			on:click={(e) => {
				e.preventDefault();
				messageBoxs.open({
					title: $LL.components.graphql.table.removeModalTitle(),
					buttonName: $LL.components.graphql.table.removeBtn(),
					buttonType: 'error',
					confirm: () => {
						remove();
						return true;
					}
				});
			}}
		>
			{$LL.components.graphql.editor.removeBtn()}
		</button>
	</FormButtons>
</Form>