<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import { FormItems } from '@graphace/ui/components/form';
	import {
		StringItem,
		TimestampItem,
		BooleanItem,
		IDItem,
		IntItem,
		ObjectItem
	} from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '~/i18n/i18n-svelte';
	import type { User, MutationTypeUserArgs } from '~/lib/types/schema';

	export let node: MutationTypeUserArgs = {};
	export let errors: Record<string, Errors> = {};

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
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

<Card>
	<FormItems
		title="User"
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
		<StringItem
			label="createGroupId"
			name="createGroupId"
			bind:value={node.createGroupId}
			errors={errors.createGroupId}
		/>
		<TimestampItem
			label="createTime"
			name="createTime"
			bind:value={node.createTime}
			errors={errors.createTime}
		/>
		<StringItem
			label="createUserId"
			name="createUserId"
			bind:value={node.createUserId}
			errors={errors.createUserId}
		/>
		<BooleanItem label="disable" name="disable" bind:value={node.disable} errors={errors.disable} />
		<StringItem label="email" name="email" bind:value={node.email} errors={errors.email} />
		<ObjectItem name="groups" path="_/groups" label="groups" errors={errors.groups} on:gotoField />
		<ObjectItem
			name="groupsConnection"
			path="_/groups-connection"
			label="groupsConnection"
			errors={errors.groupsConnection}
			on:gotoField
		/>
		<IDItem label="id" name="id" bind:value={node.id} errors={errors.id} />
		<BooleanItem
			label="isDeprecated"
			name="isDeprecated"
			bind:value={node.isDeprecated}
			errors={errors.isDeprecated}
		/>
		<StringItem
			label="lastName"
			name="lastName"
			bind:value={node.lastName}
			errors={errors.lastName}
		/>
		<StringItem label="login" name="login" bind:value={node.login} errors={errors.login} />
		<StringItem label="name" name="name" bind:value={node.name} errors={errors.name} />
		<StringItem
			label="password"
			name="password"
			bind:value={node.password}
			errors={errors.password}
		/>
		<ObjectItem name="realm" path="_/realm" label="realm" errors={errors.realm} on:gotoField />
		<StringItem label="realmId" name="realmId" bind:value={node.realmId} errors={errors.realmId} />
		<ObjectItem name="roles" path="_/roles" label="roles" errors={errors.roles} on:gotoField />
		<ObjectItem
			name="rolesConnection"
			path="_/roles-connection"
			label="rolesConnection"
			errors={errors.rolesConnection}
			on:gotoField
		/>
		<TimestampItem
			label="updateTime"
			name="updateTime"
			bind:value={node.updateTime}
			errors={errors.updateTime}
		/>
		<StringItem
			label="updateUserId"
			name="updateUserId"
			bind:value={node.updateUserId}
			errors={errors.updateUserId}
		/>
		<ObjectItem
			name="userGroup"
			path="_/user-group"
			label="userGroup"
			errors={errors.userGroup}
			on:gotoField
		/>
		<ObjectItem
			name="userGroupConnection"
			path="_/user-group-connection"
			label="userGroupConnection"
			errors={errors.userGroupConnection}
			on:gotoField
		/>
		<ObjectItem
			name="userRole"
			path="_/user-role"
			label="userRole"
			errors={errors.userRole}
			on:gotoField
		/>
		<ObjectItem
			name="userRoleConnection"
			path="_/user-role-connection"
			label="userRoleConnection"
			errors={errors.userRoleConnection}
			on:gotoField
		/>
		<IntItem label="version" name="version" bind:value={node.version} errors={errors.version} />
	</FormItems>
</Card>
