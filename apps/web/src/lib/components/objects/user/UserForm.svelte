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
	import type { User, MutationTypeUserArgs } from '~/lib/types/schema';

	export let node: User | null | undefined;
	export let isFetching: boolean;
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showUnbindButton: boolean = false;
	export let showGotoSelectButton: boolean = false;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		parentMutation: {
			args: MutationTypeUserArgs | null;
			update?: boolean;
			then: (data: User | null | undefined) => void;
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
		title="User"
		{showRemoveButton}
		{showUnbindButton}
		{showGotoSelectButton}
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
			<FormLoading rows={15} />
		{:else}
			{#if node}
				<IDItem label="id" name="id" bind:value={node.id} errors={errors.id} />
				<StringItem label="name" name="name" bind:value={node.name} errors={errors.name} />
				<StringItem label="lastName" name="lastName" bind:value={node.lastName} errors={errors.lastName} />
				<StringItem label="login" name="login" bind:value={node.login} errors={errors.login} />
				<StringItem label="password" name="password" bind:value={node.password} errors={errors.password} />
				<StringItem label="email" name="email" bind:value={node.email} errors={errors.email} />
				<BooleanItem label="disable" name="disable" bind:value={node.disable} errors={errors.disable} />
				<ObjectItem name="groups" path={`${node.id}/groups`} label="groups" errors={errors.groups} on:gotoField />
				<ObjectItem name="roles" path={`${node.id}/roles`} label="roles" errors={errors.roles} on:gotoField />
				<ObjectItem name="realm" path={`${node.id}/realm`} label="realm" errors={errors.realm} on:gotoField />
				<BooleanItem label="isDeprecated" name="isDeprecated" bind:value={node.isDeprecated} errors={errors.isDeprecated} />
				<IntItem label="version" name="version" bind:value={node.version} errors={errors.version} />
				<StringItem label="realmId" name="realmId" bind:value={node.realmId} errors={errors.realmId} />
				<StringItem label="createUserId" name="createUserId" bind:value={node.createUserId} errors={errors.createUserId} />
				<TimestampItem label="createTime" name="createTime" bind:value={node.createTime} errors={errors.createTime} />
				<StringItem label="updateUserId" name="updateUserId" bind:value={node.updateUserId} errors={errors.updateUserId} />
				<TimestampItem label="updateTime" name="updateTime" bind:value={node.updateTime} errors={errors.updateTime} />
				<StringItem label="createGroupId" name="createGroupId" bind:value={node.createGroupId} errors={errors.createGroupId} />
				<ObjectItem name="userGroup" path={`${node.id}/user-group`} label="userGroup" errors={errors.userGroup} on:gotoField />
				<ObjectItem name="userRole" path={`${node.id}/user-role`} label="userRole" errors={errors.userRole} on:gotoField />
			{/if}
		{/if}
	</Form>
</Card>
