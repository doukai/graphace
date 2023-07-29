<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import { Form } from '@graphace/ui/components/form';
	import { IDItem, StringItem, BooleanItem, IntItem, TimestampItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { Group, MutationTypeGroupArgs } from '~/lib/types/schema';

	export let node: MutationTypeGroupArgs = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeGroupArgs;
			update?: boolean;
			then: (data: Group | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		save: {};
		gotoSelect: {};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			dispatch('mutation', {
				args: node,
				then: (data) => {
					notifications.success($LL.web.message.saveSuccess());
					dispatch('save');
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
				args: {},
				then: (data) => {
					notifications.success($LL.web.message.removeSuccess());
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
		title="Group"
		showRemoveButton={showRemoveButton && node !== undefined && node !== null && Object.keys(node).length > 0}
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
		on:gotoSelect
		on:back
	>
		<IDItem label="id" name="id" bind:value={node.id} errors={errors.id} />
		<StringItem label="name" name="name" bind:value={node.name} errors={errors.name} />
		<ObjectItem name="users" path="_/users" label="users" errors={errors.users} on:gotoField />
		<ObjectItem name="roles" path="_/roles" label="roles" errors={errors.roles} on:gotoField />
		<ObjectItem name="realm" path="_/realm" label="realm" errors={errors.realm} on:gotoField />
		<BooleanItem label="isDeprecated" name="isDeprecated" bind:value={node.isDeprecated} errors={errors.isDeprecated} />
		<IntItem label="version" name="version" bind:value={node.version} errors={errors.version} />
		<StringItem label="realmId" name="realmId" bind:value={node.realmId} errors={errors.realmId} />
		<StringItem label="createUserId" name="createUserId" bind:value={node.createUserId} errors={errors.createUserId} />
		<TimestampItem label="createTime" name="createTime" bind:value={node.createTime} errors={errors.createTime} />
		<StringItem label="updateUserId" name="updateUserId" bind:value={node.updateUserId} errors={errors.updateUserId} />
		<TimestampItem label="updateTime" name="updateTime" bind:value={node.updateTime} errors={errors.updateTime} />
		<StringItem label="createGroupId" name="createGroupId" bind:value={node.createGroupId} errors={errors.createGroupId} />
		<IntItem label="parentId" name="parentId" bind:value={node.parentId} errors={errors.parentId} />
		<ObjectItem name="userGroup" path="_/user-group" label="userGroup" errors={errors.userGroup} on:gotoField />
		<ObjectItem name="groupRole" path="_/group-role" label="groupRole" errors={errors.groupRole} on:gotoField />
	</Form>
</Card>