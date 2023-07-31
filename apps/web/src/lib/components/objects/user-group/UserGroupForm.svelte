<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import { Form, FormLoading } from '@graphace/ui/components/form';
	import { IDItem, IntItem, BooleanItem, StringItem, TimestampItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { UserGroup, MutationTypeUserGroupArgs } from '~/lib/types/schema';

	export let node: UserGroup | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeUserGroupArgs;
			update?: boolean;
			then: (data: UserGroup | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		parentMutation: {
			args: MutationTypeUserGroupArgs | null;
			update?: boolean;
			then: (data: UserGroup | null | undefined) => void;
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
		title={$LL.graphql.objects.UserGroup.name()}
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
				<IDItem label={$LL.graphql.objects.UserGroup.fields.id.name()} name="id" bind:value={node.id} errors={errors.id} />
				<IntItem label={$LL.graphql.objects.UserGroup.fields.userId.name()} name="userId" bind:value={node.userId} errors={errors.userId} />
				<ObjectItem name="from" path={`${node.id}/from`} label={$LL.graphql.objects.UserGroup.fields.from.name()} errors={errors.from} on:gotoField />
				<IntItem label={$LL.graphql.objects.UserGroup.fields.groupId.name()} name="groupId" bind:value={node.groupId} errors={errors.groupId} />
				<ObjectItem name="to" path={`${node.id}/to`} label={$LL.graphql.objects.UserGroup.fields.to.name()} errors={errors.to} on:gotoField />
				<BooleanItem label={$LL.graphql.objects.UserGroup.fields.isDeprecated.name()} name="isDeprecated" bind:value={node.isDeprecated} errors={errors.isDeprecated} />
				<IntItem label={$LL.graphql.objects.UserGroup.fields.version.name()} name="version" bind:value={node.version} errors={errors.version} />
				<StringItem label={$LL.graphql.objects.UserGroup.fields.realmId.name()} name="realmId" bind:value={node.realmId} errors={errors.realmId} />
				<StringItem label={$LL.graphql.objects.UserGroup.fields.createUserId.name()} name="createUserId" bind:value={node.createUserId} errors={errors.createUserId} />
				<TimestampItem label={$LL.graphql.objects.UserGroup.fields.createTime.name()} name="createTime" bind:value={node.createTime} errors={errors.createTime} />
				<StringItem label={$LL.graphql.objects.UserGroup.fields.updateUserId.name()} name="updateUserId" bind:value={node.updateUserId} errors={errors.updateUserId} />
				<TimestampItem label={$LL.graphql.objects.UserGroup.fields.updateTime.name()} name="updateTime" bind:value={node.updateTime} errors={errors.updateTime} />
				<StringItem label={$LL.graphql.objects.UserGroup.fields.createGroupId.name()} name="createGroupId" bind:value={node.createGroupId} errors={errors.createGroupId} />
			{/if}
		{/if}
	</Form>
</Card>
