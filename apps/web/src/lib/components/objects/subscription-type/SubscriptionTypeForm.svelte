<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Form, FormLoading, FormItems, FormButtons } from '@graphace/ui/components/form';
	import { StringItem, TimestampItem, BooleanItem, IntItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '~/i18n/i18n-svelte';
	import type { SubscriptionType, MutationTypeSubscriptionTypeArgs } from '~/lib/types/schema';

	export let node: SubscriptionType | null | undefined;
	export let isFetching: boolean = false;
	export let errors: Record<string, Errors> = {};

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeSubscriptionTypeArgs;
			update?: boolean;
			then: (data: SubscriptionType | null | undefined) => void;
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
				args: { id: node., isDeprecated: true },
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

<Form>
	<FormItems title="SubscriptionType">
		{#if isFetching}
			<FormLoading rows={8} />
		{:else}
			{#if node}
				<StringItem label="createGroupId" name="createGroupId" bind:value={node.createGroupId} readonly errors={errors.createGroupId} />
				<TimestampItem label="createTime" name="createTime" bind:value={node.createTime} readonly errors={errors.createTime} />
				<StringItem label="createUserId" name="createUserId" bind:value={node.createUserId} readonly errors={errors.createUserId} />
				<ObjectItem name="group" path={`${node.}/group`} label="group" errors={errors.group} on:gotoField />
				<ObjectItem name="groupConnection" path={`${node.}/group-connection`} label="groupConnection" errors={errors.groupConnection} on:gotoField />
				<ObjectItem name="groupList" path={`${node.}/group-list`} label="groupList" errors={errors.groupList} on:gotoField />
				<ObjectItem name="groupRole" path={`${node.}/group-role`} label="groupRole" errors={errors.groupRole} on:gotoField />
				<ObjectItem name="groupRoleConnection" path={`${node.}/group-role-connection`} label="groupRoleConnection" errors={errors.groupRoleConnection} on:gotoField />
				<ObjectItem name="groupRoleList" path={`${node.}/group-role-list`} label="groupRoleList" errors={errors.groupRoleList} on:gotoField />
				<BooleanItem label="isDeprecated" name="isDeprecated" bind:value={node.isDeprecated} readonly errors={errors.isDeprecated} />
				<ObjectItem name="permission" path={`${node.}/permission`} label="permission" errors={errors.permission} on:gotoField />
				<ObjectItem name="permissionConnection" path={`${node.}/permission-connection`} label="permissionConnection" errors={errors.permissionConnection} on:gotoField />
				<ObjectItem name="permissionList" path={`${node.}/permission-list`} label="permissionList" errors={errors.permissionList} on:gotoField />
				<ObjectItem name="realm" path={`${node.}/realm`} label="realm" errors={errors.realm} on:gotoField />
				<ObjectItem name="realmConnection" path={`${node.}/realm-connection`} label="realmConnection" errors={errors.realmConnection} on:gotoField />
				<StringItem label="realmId" name="realmId" bind:value={node.realmId} readonly errors={errors.realmId} />
				<ObjectItem name="realmList" path={`${node.}/realm-list`} label="realmList" errors={errors.realmList} on:gotoField />
				<ObjectItem name="role" path={`${node.}/role`} label="role" errors={errors.role} on:gotoField />
				<ObjectItem name="roleComposite" path={`${node.}/role-composite`} label="roleComposite" errors={errors.roleComposite} on:gotoField />
				<ObjectItem name="roleCompositeConnection" path={`${node.}/role-composite-connection`} label="roleCompositeConnection" errors={errors.roleCompositeConnection} on:gotoField />
				<ObjectItem name="roleCompositeList" path={`${node.}/role-composite-list`} label="roleCompositeList" errors={errors.roleCompositeList} on:gotoField />
				<ObjectItem name="roleConnection" path={`${node.}/role-connection`} label="roleConnection" errors={errors.roleConnection} on:gotoField />
				<ObjectItem name="roleList" path={`${node.}/role-list`} label="roleList" errors={errors.roleList} on:gotoField />
				<TimestampItem label="updateTime" name="updateTime" bind:value={node.updateTime} readonly errors={errors.updateTime} />
				<StringItem label="updateUserId" name="updateUserId" bind:value={node.updateUserId} readonly errors={errors.updateUserId} />
				<ObjectItem name="user" path={`${node.}/user`} label="user" errors={errors.user} on:gotoField />
				<ObjectItem name="userConnection" path={`${node.}/user-connection`} label="userConnection" errors={errors.userConnection} on:gotoField />
				<ObjectItem name="userGroup" path={`${node.}/user-group`} label="userGroup" errors={errors.userGroup} on:gotoField />
				<ObjectItem name="userGroupConnection" path={`${node.}/user-group-connection`} label="userGroupConnection" errors={errors.userGroupConnection} on:gotoField />
				<ObjectItem name="userGroupList" path={`${node.}/user-group-list`} label="userGroupList" errors={errors.userGroupList} on:gotoField />
				<ObjectItem name="userList" path={`${node.}/user-list`} label="userList" errors={errors.userList} on:gotoField />
				<ObjectItem name="userRole" path={`${node.}/user-role`} label="userRole" errors={errors.userRole} on:gotoField />
				<ObjectItem name="userRoleConnection" path={`${node.}/user-role-connection`} label="userRoleConnection" errors={errors.userRoleConnection} on:gotoField />
				<ObjectItem name="userRoleList" path={`${node.}/user-role-list`} label="userRoleList" errors={errors.userRoleList} on:gotoField />
				<IntItem label="version" name="version" bind:value={node.version} readonly errors={errors.version} />
			{/if}
		{/if}
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
			disabled={isFetching}
			on:click={(e) => {
				e.preventDefault();
				save();
			}}
		>
			{$LL.components.graphql.editor.saveBtn()}
		</button>
		<button
			class="btn btn-outline btn-error"
			disabled={isFetching}
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
