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
	import type { Role, MutationTypeRoleArgs } from '~/lib/types/schema';

	export let node: Role | null | undefined;
	export let isFetching: boolean = false;
	export let errors: Record<string, Errors> = {};

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeRoleArgs;
			update?: boolean;
			then: (data: Role | null | undefined) => void;
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
		title="Role"
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
				<ObjectItem name="compositesConnection" path={`${node.id}/composites-connection`} label="compositesConnection" errors={errors.compositesConnection} on:gotoField />
				<StringItem label="createGroupId" name="createGroupId" bind:value={node.createGroupId} errors={errors.createGroupId} />
				<TimestampItem label="createTime" name="createTime" bind:value={node.createTime} errors={errors.createTime} />
				<StringItem label="createUserId" name="createUserId" bind:value={node.createUserId} errors={errors.createUserId} />
				<StringItem label="description" name="description" bind:value={node.description} errors={errors.description} />
				<IDItem label="id" name="id" bind:value={node.id} errors={errors.id} />
				<BooleanItem label="isDeprecated" name="isDeprecated" bind:value={node.isDeprecated} errors={errors.isDeprecated} />
				<StringItem label="name" name="name" bind:value={node.name} errors={errors.name} />
				<ObjectItem name="permissions" path={`${node.id}/permissions`} label="permissions" errors={errors.permissions} on:gotoField />
				<ObjectItem name="permissionsConnection" path={`${node.id}/permissions-connection`} label="permissionsConnection" errors={errors.permissionsConnection} on:gotoField />
				<ObjectItem name="realm" path={`${node.id}/realm`} label="realm" errors={errors.realm} on:gotoField />
				<StringItem label="realmId" name="realmId" bind:value={node.realmId} errors={errors.realmId} />
				<ObjectItem name="roleComposite" path={`${node.id}/role-composite`} label="roleComposite" errors={errors.roleComposite} on:gotoField />
				<ObjectItem name="roleCompositeConnection" path={`${node.id}/role-composite-connection`} label="roleCompositeConnection" errors={errors.roleCompositeConnection} on:gotoField />
				<TimestampItem label="updateTime" name="updateTime" bind:value={node.updateTime} errors={errors.updateTime} />
				<StringItem label="updateUserId" name="updateUserId" bind:value={node.updateUserId} errors={errors.updateUserId} />
				<ObjectItem name="userRole" path={`${node.id}/user-role`} label="userRole" errors={errors.userRole} on:gotoField />
				<ObjectItem name="userRoleConnection" path={`${node.id}/user-role-connection`} label="userRoleConnection" errors={errors.userRoleConnection} on:gotoField />
				<ObjectItem name="users" path={`${node.id}/users`} label="users" errors={errors.users} on:gotoField />
				<ObjectItem name="usersConnection" path={`${node.id}/users-connection`} label="usersConnection" errors={errors.usersConnection} on:gotoField />
				<IntItem label="version" name="version" bind:value={node.version} errors={errors.version} />
			{/if}
		{/if}
	</Form>
</Card>
