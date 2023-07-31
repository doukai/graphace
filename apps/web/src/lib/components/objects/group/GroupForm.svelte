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
	import type { Group, MutationTypeGroupArgs } from '~/lib/types/schema';

	export let node: Group | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeGroupArgs;
			update?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		parentMutation: {
			args: MutationTypeGroupArgs | null;
			update?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		gotoSelect: {};
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

	const unbind = (): void => {
		if (node) {
			dispatch('parentMutation', {
				args: null,
				update: true,
				then: (data) => {
					notifications.success($LL.web.message.unbindSuccess());
					dispatch('back');
				},
				catch: (errors) => {
					console.error(errors);
					notifications.error($LL.web.message.unbindFailed());
				}
			});
		}
	};
</script>

<Card>
	<Form
		title={$LL.graphql.objects.Group.name()}
		{showRemoveButton}
		{showUnbindButton}
		{showGotoSelectButton}
		{showBackButton}
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
		on:unbind={() =>
			messageBoxs.open({
				title: $LL.web.components.table.unbindModalTitle(),
				buttonName: $LL.web.components.table.unbindBtn(),
				buttonType: 'error',
				confirm: () => {
					unbind();
					return true;
				},
				button1: {
					name: $LL.web.components.table.removeBtn(),
					className: 'btn-error',
					onClick: () => {
						remove();
						return true;
					}
				}
			})}
		on:gotoSelect
		on:back
	>
		{#if isFetching}
			<FormLoading rows={11} />
		{:else}
			{#if node}
				<IDItem label={$LL.graphql.objects.Group.fields.id.name()} name="id" bind:value={node.id} errors={errors.id} />
				<StringItem label={$LL.graphql.objects.Group.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
				<ObjectItem name="users" path={`${node.id}/users`} label={$LL.graphql.objects.Group.fields.users.name()} errors={errors.users} on:gotoField />
				<ObjectItem name="roles" path={`${node.id}/roles`} label={$LL.graphql.objects.Group.fields.roles.name()} errors={errors.roles} on:gotoField />
				<ObjectItem name="realm" path={`${node.id}/realm`} label={$LL.graphql.objects.Group.fields.realm.name()} errors={errors.realm} on:gotoField />
				<BooleanItem label={$LL.graphql.objects.Group.fields.isDeprecated.name()} name="isDeprecated" bind:value={node.isDeprecated} errors={errors.isDeprecated} />
				<IntItem label={$LL.graphql.objects.Group.fields.version.name()} name="version" bind:value={node.version} errors={errors.version} />
				<StringItem label={$LL.graphql.objects.Group.fields.realmId.name()} name="realmId" bind:value={node.realmId} errors={errors.realmId} />
				<StringItem label={$LL.graphql.objects.Group.fields.createUserId.name()} name="createUserId" bind:value={node.createUserId} errors={errors.createUserId} />
				<TimestampItem label={$LL.graphql.objects.Group.fields.createTime.name()} name="createTime" bind:value={node.createTime} errors={errors.createTime} />
				<StringItem label={$LL.graphql.objects.Group.fields.updateUserId.name()} name="updateUserId" bind:value={node.updateUserId} errors={errors.updateUserId} />
				<TimestampItem label={$LL.graphql.objects.Group.fields.updateTime.name()} name="updateTime" bind:value={node.updateTime} errors={errors.updateTime} />
				<StringItem label={$LL.graphql.objects.Group.fields.createGroupId.name()} name="createGroupId" bind:value={node.createGroupId} errors={errors.createGroupId} />
				<IntItem label={$LL.graphql.objects.Group.fields.parentId.name()} name="parentId" bind:value={node.parentId} errors={errors.parentId} />
				<ObjectItem name="userGroup" path={`${node.id}/user-group`} label={$LL.graphql.objects.Group.fields.userGroup.name()} errors={errors.userGroup} on:gotoField />
				<ObjectItem name="groupRole" path={`${node.id}/group-role`} label={$LL.graphql.objects.Group.fields.groupRole.name()} errors={errors.groupRole} on:gotoField />
			{/if}
		{/if}
	</Form>
</Card>
