<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import { Form } from '@graphace/ui/components/form';
	import { IDItem, StringItem, BooleanItem, IntItem, TimestampItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import PermissionLevelItem from '~/lib/components/enums/permission-level/PermissionLevelItem.svelte';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { Permission, MutationTypePermissionArgs } from '~/lib/types/schema';

	export let node: MutationTypePermissionArgs = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypePermissionArgs;
			update?: boolean;
			then: (data: Permission | null | undefined) => void;
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
		title={$LL.graphql.objects.Permission.name()}
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
		<IDItem label={$LL.graphql.objects.Permission.fields.id.name()} name="id" bind:value={node.id} errors={errors.id} />
		<StringItem label={$LL.graphql.objects.Permission.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
		<StringItem label={$LL.graphql.objects.Permission.fields.ofTypeName.name()} name="ofTypeName" bind:value={node.ofTypeName} errors={errors.ofTypeName} />
		<StringItem label={$LL.graphql.objects.Permission.fields.description.name()} name="description" bind:value={node.description} errors={errors.description} />
		<PermissionLevelItem label={$LL.graphql.objects.Permission.fields.level.name()} name="level" bind:value={node.level} errors={errors.level} />
		<ObjectItem name="role" path="_/role" label={$LL.graphql.objects.Permission.fields.role.name()} errors={errors.role} on:gotoField />
		<ObjectItem name="realm" path="_/realm" label={$LL.graphql.objects.Permission.fields.realm.name()} errors={errors.realm} on:gotoField />
		<BooleanItem label={$LL.graphql.objects.Permission.fields.isDeprecated.name()} name="isDeprecated" bind:value={node.isDeprecated} errors={errors.isDeprecated} />
		<IntItem label={$LL.graphql.objects.Permission.fields.version.name()} name="version" bind:value={node.version} errors={errors.version} />
		<StringItem label={$LL.graphql.objects.Permission.fields.realmId.name()} name="realmId" bind:value={node.realmId} errors={errors.realmId} />
		<StringItem label={$LL.graphql.objects.Permission.fields.createUserId.name()} name="createUserId" bind:value={node.createUserId} errors={errors.createUserId} />
		<TimestampItem label={$LL.graphql.objects.Permission.fields.createTime.name()} name="createTime" bind:value={node.createTime} errors={errors.createTime} />
		<StringItem label={$LL.graphql.objects.Permission.fields.updateUserId.name()} name="updateUserId" bind:value={node.updateUserId} errors={errors.updateUserId} />
		<TimestampItem label={$LL.graphql.objects.Permission.fields.updateTime.name()} name="updateTime" bind:value={node.updateTime} errors={errors.updateTime} />
		<StringItem label={$LL.graphql.objects.Permission.fields.createGroupId.name()} name="createGroupId" bind:value={node.createGroupId} errors={errors.createGroupId} />
		<IntItem label={$LL.graphql.objects.Permission.fields.roleId.name()} name="roleId" bind:value={node.roleId} errors={errors.roleId} />
	</Form>
</Card>