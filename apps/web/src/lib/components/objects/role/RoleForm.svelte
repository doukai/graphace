<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import { Form, FormLoading } from '@graphace/ui/components/form';
	import { IDItem, StringItem, BooleanItem, IntItem, TimestampItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { Role, MutationTypeRoleArgs } from '~/lib/types/schema';

	export let node: Role | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;

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
					notifications.success($LL.web.message.saveSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.saveFailed());
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
					notifications.success($LL.web.message.removeSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.removeFailed());
				}
			});
		}
	};
</script>

<Card>
	<Form
		title="Role"
		{showRemoveButton}
		on:save={save}
		on:remove={() =>
			messageBoxs.open({
				title: $LL.web.components.table.removeModalTitle(),
				buttonName: $LL.web.components.table.removeBtn(),
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
				<IDItem label="id" name="id" bind:value={node.id} errors={errors.id} />
				<StringItem label="name" name="name" bind:value={node.name} errors={errors.name} />
				<StringItem label="description" name="description" bind:value={node.description} errors={errors.description} />
				<ObjectItem name="users" path={`${node.id}/users`} label="users" errors={errors.users} on:gotoField />
				<ObjectItem name="permissions" path={`${node.id}/permissions`} label="permissions" errors={errors.permissions} on:gotoField />
				<ObjectItem name="realm" path={`${node.id}/realm`} label="realm" errors={errors.realm} on:gotoField />
				<BooleanItem label="isDeprecated" name="isDeprecated" bind:value={node.isDeprecated} errors={errors.isDeprecated} />
				<IntItem label="version" name="version" bind:value={node.version} errors={errors.version} />
				<StringItem label="realmId" name="realmId" bind:value={node.realmId} errors={errors.realmId} />
				<StringItem label="createUserId" name="createUserId" bind:value={node.createUserId} errors={errors.createUserId} />
				<TimestampItem label="createTime" name="createTime" bind:value={node.createTime} errors={errors.createTime} />
				<StringItem label="updateUserId" name="updateUserId" bind:value={node.updateUserId} errors={errors.updateUserId} />
				<TimestampItem label="updateTime" name="updateTime" bind:value={node.updateTime} errors={errors.updateTime} />
				<StringItem label="createGroupId" name="createGroupId" bind:value={node.createGroupId} errors={errors.createGroupId} />
				<ObjectItem name="userRole" path={`${node.id}/user-role`} label="userRole" errors={errors.userRole} on:gotoField />
				<ObjectItem name="roleComposite" path={`${node.id}/role-composite`} label="roleComposite" errors={errors.roleComposite} on:gotoField />
			{/if}
		{/if}
	</Form>
</Card>
