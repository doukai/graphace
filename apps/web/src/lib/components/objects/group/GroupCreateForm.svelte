<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Form, FormItems, FormButtons } from '@graphace/ui/components/form';
	import { StringItem, TimestampItem, IDItem, BooleanItem, IntItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '~/i18n/i18n-svelte';
	import type { Group, MutationTypeGroupArgs } from '~/lib/types/schema';

	export let node: MutationTypeGroupArgs = {};
	export let errors: Record<string, Errors> = {};

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeGroupArgs;
			update?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: Errors) => void;
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
					catch: (errors) => {
						console.error(errors);
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
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.message.removeFailed());
				}
			});
		}
	};
</script>

<Form>
	<FormItems title="Group">
		<StringItem label="createGroupId" name="createGroupId" bind:value={node.createGroupId} errors={errors.createGroupId} />
		<TimestampItem label="createTime" name="createTime" bind:value={node.createTime} errors={errors.createTime} />
		<StringItem label="createUserId" name="createUserId" bind:value={node.createUserId} errors={errors.createUserId} />
		<ObjectItem name="groupRole" path="_/group-role" label="groupRole" errors={errors.groupRole} on:gotoField />
		<ObjectItem name="groupRoleConnection" path="_/group-role-connection" label="groupRoleConnection" errors={errors.groupRoleConnection} on:gotoField />
		<IDItem label="id" name="id" bind:value={node.id} errors={errors.id} />
		<BooleanItem label="isDeprecated" name="isDeprecated" bind:value={node.isDeprecated} errors={errors.isDeprecated} />
		<StringItem label="name" name="name" bind:value={node.name} errors={errors.name} />
		<IntItem label="parentId" name="parentId" bind:value={node.parentId} errors={errors.parentId} />
		<ObjectItem name="realm" path="_/realm" label="realm" errors={errors.realm} on:gotoField />
		<StringItem label="realmId" name="realmId" bind:value={node.realmId} errors={errors.realmId} />
		<ObjectItem name="roles" path="_/roles" label="roles" errors={errors.roles} on:gotoField />
		<ObjectItem name="rolesConnection" path="_/roles-connection" label="rolesConnection" errors={errors.rolesConnection} on:gotoField />
		<ObjectItem name="subGroupsConnection" path="_/sub-groups-connection" label="subGroupsConnection" errors={errors.subGroupsConnection} on:gotoField />
		<TimestampItem label="updateTime" name="updateTime" bind:value={node.updateTime} errors={errors.updateTime} />
		<StringItem label="updateUserId" name="updateUserId" bind:value={node.updateUserId} errors={errors.updateUserId} />
		<ObjectItem name="userGroup" path="_/user-group" label="userGroup" errors={errors.userGroup} on:gotoField />
		<ObjectItem name="userGroupConnection" path="_/user-group-connection" label="userGroupConnection" errors={errors.userGroupConnection} on:gotoField />
		<ObjectItem name="users" path="_/users" label="users" errors={errors.users} on:gotoField />
		<ObjectItem name="usersConnection" path="_/users-connection" label="usersConnection" errors={errors.usersConnection} on:gotoField />
		<IntItem label="version" name="version" bind:value={node.version} errors={errors.version} />
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