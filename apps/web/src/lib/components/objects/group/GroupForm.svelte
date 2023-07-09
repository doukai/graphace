<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import { Form, FormLoading } from '@graphace/ui/components/form';
	import { StringItem, TimestampItem, IDItem, BooleanItem, IntItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '~/i18n/i18n-svelte';
	import type { Group, MutationTypeGroupArgs } from '~/lib/types/schema';

	export let node: Group | null | undefined;
	export let isFetching: boolean = false;
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
			dispatch('mutation', {
				args: node,
				update: true,
				then: (data) => {
					node = data;
					notifications.success($LL.message.saveSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.message.saveFailed());
				}
			});
		}
	};

	const remove = (): void => {
		if (node) {
			dispatch('mutation', {
				args: { id: node.id, isDeprecated: true },
				update: true,
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

<Card>
	<Form
		title="Group"
		showRemoveButton={false}
		on:save={save}
		on:remove={() =>
			messageBoxs.open({
				title: $LL.components.graphql.table.removeModalTitle(),
				buttonName: $LL.components.graphql.table.removeBtn(),
				buttonType: 'error',
				confirm: () => {
					remove();
					return true;
				}
			})}
		on:back
	>
		{#if isFetching}
			<FormLoading rows={11} />
		{:else}
			{#if node}
				<StringItem label="createGroupId" name="createGroupId" bind:value={node.createGroupId} errors={errors.createGroupId} />
				<TimestampItem label="createTime" name="createTime" bind:value={node.createTime} errors={errors.createTime} />
				<StringItem label="createUserId" name="createUserId" bind:value={node.createUserId} errors={errors.createUserId} />
				<ObjectItem name="groupRole" path={`${node.id}/group-role`} label="groupRole" errors={errors.groupRole} on:gotoField />
				<ObjectItem name="groupRoleConnection" path={`${node.id}/group-role-connection`} label="groupRoleConnection" errors={errors.groupRoleConnection} on:gotoField />
				<IDItem label="id" name="id" bind:value={node.id} errors={errors.id} />
				<BooleanItem label="isDeprecated" name="isDeprecated" bind:value={node.isDeprecated} errors={errors.isDeprecated} />
				<StringItem label="name" name="name" bind:value={node.name} errors={errors.name} />
				<IntItem label="parentId" name="parentId" bind:value={node.parentId} errors={errors.parentId} />
				<ObjectItem name="realm" path={`${node.id}/realm`} label="realm" errors={errors.realm} on:gotoField />
				<StringItem label="realmId" name="realmId" bind:value={node.realmId} errors={errors.realmId} />
				<ObjectItem name="roles" path={`${node.id}/roles`} label="roles" errors={errors.roles} on:gotoField />
				<ObjectItem name="rolesConnection" path={`${node.id}/roles-connection`} label="rolesConnection" errors={errors.rolesConnection} on:gotoField />
				<ObjectItem name="subGroupsConnection" path={`${node.id}/sub-groups-connection`} label="subGroupsConnection" errors={errors.subGroupsConnection} on:gotoField />
				<TimestampItem label="updateTime" name="updateTime" bind:value={node.updateTime} errors={errors.updateTime} />
				<StringItem label="updateUserId" name="updateUserId" bind:value={node.updateUserId} errors={errors.updateUserId} />
				<ObjectItem name="userGroup" path={`${node.id}/user-group`} label="userGroup" errors={errors.userGroup} on:gotoField />
				<ObjectItem name="userGroupConnection" path={`${node.id}/user-group-connection`} label="userGroupConnection" errors={errors.userGroupConnection} on:gotoField />
				<ObjectItem name="users" path={`${node.id}/users`} label="users" errors={errors.users} on:gotoField />
				<ObjectItem name="usersConnection" path={`${node.id}/users-connection`} label="usersConnection" errors={errors.usersConnection} on:gotoField />
				<IntItem label="version" name="version" bind:value={node.version} errors={errors.version} />
			{/if}
		{/if}
	</Form>
</Card>
