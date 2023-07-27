<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import { Form } from '@graphace/ui/components/form';
	import { IDItem, IntItem, BooleanItem, StringItem, TimestampItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { RoleComposite, MutationTypeRoleCompositeArgs } from '~/lib/types/schema';

	export let node: MutationTypeRoleCompositeArgs = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;

	const dispatch = createEventDispatcher<{
		mutation: { node: MutationTypeRoleCompositeArgs| null | undefined };
		save: { node: MutationTypeRoleCompositeArgs| null | undefined };
		gotoSelect: {};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			dispatch('save', { node });
		}
	};

	const remove = (): void => {
		if (node) {
			dispatch('mutation', { node: {} });
		}
	};
</script>

<Card>
	<Form
		title="RoleComposite"
		showRemoveButton={showRemoveButton && node !== undefined && node !== null && Object.keys(node).length > 0}
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
		on:gotoSelect
		on:back
	>
		<IDItem label="id" name="id" bind:value={node.id} errors={errors.id} />
		<IntItem label="roleId" name="roleId" bind:value={node.roleId} errors={errors.roleId} />
		<ObjectItem name="from" path="_/from" label="from" errors={errors.from} on:gotoField />
		<IntItem label="compositeId" name="compositeId" bind:value={node.compositeId} errors={errors.compositeId} />
		<ObjectItem name="to" path="_/to" label="to" errors={errors.to} on:gotoField />
		<BooleanItem label="isDeprecated" name="isDeprecated" bind:value={node.isDeprecated} errors={errors.isDeprecated} />
		<IntItem label="version" name="version" bind:value={node.version} errors={errors.version} />
		<StringItem label="realmId" name="realmId" bind:value={node.realmId} errors={errors.realmId} />
		<StringItem label="createUserId" name="createUserId" bind:value={node.createUserId} errors={errors.createUserId} />
		<TimestampItem label="createTime" name="createTime" bind:value={node.createTime} errors={errors.createTime} />
		<StringItem label="updateUserId" name="updateUserId" bind:value={node.updateUserId} errors={errors.updateUserId} />
		<TimestampItem label="updateTime" name="updateTime" bind:value={node.updateTime} errors={errors.updateTime} />
		<StringItem label="createGroupId" name="createGroupId" bind:value={node.createGroupId} errors={errors.createGroupId} />
	</Form>
</Card>