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
	import type { Realm, MutationTypeRealmArgs } from '~/lib/types/schema';

	export let node: MutationTypeRealmArgs = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeRealmArgs;
			update?: boolean;
			then: (data: Realm | null | undefined) => void;
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
		title={$LL.graphql.objects.Realm.name()}
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
		<IDItem label={$LL.graphql.objects.Realm.fields.id.name()} name="id" bind:value={node.id} errors={errors.id} />
		<StringItem label={$LL.graphql.objects.Realm.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
		<BooleanItem label={$LL.graphql.objects.Realm.fields.isDeprecated.name()} name="isDeprecated" bind:value={node.isDeprecated} errors={errors.isDeprecated} />
		<IntItem label={$LL.graphql.objects.Realm.fields.version.name()} name="version" bind:value={node.version} errors={errors.version} />
		<StringItem label={$LL.graphql.objects.Realm.fields.realmId.name()} name="realmId" bind:value={node.realmId} errors={errors.realmId} />
		<StringItem label={$LL.graphql.objects.Realm.fields.createUserId.name()} name="createUserId" bind:value={node.createUserId} errors={errors.createUserId} />
		<TimestampItem label={$LL.graphql.objects.Realm.fields.createTime.name()} name="createTime" bind:value={node.createTime} errors={errors.createTime} />
		<StringItem label={$LL.graphql.objects.Realm.fields.updateUserId.name()} name="updateUserId" bind:value={node.updateUserId} errors={errors.updateUserId} />
		<TimestampItem label={$LL.graphql.objects.Realm.fields.updateTime.name()} name="updateTime" bind:value={node.updateTime} errors={errors.updateTime} />
		<StringItem label={$LL.graphql.objects.Realm.fields.createGroupId.name()} name="createGroupId" bind:value={node.createGroupId} errors={errors.createGroupId} />
	</Form>
</Card>