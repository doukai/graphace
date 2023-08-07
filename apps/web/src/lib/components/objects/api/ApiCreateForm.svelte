<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import { Form } from '@graphace/ui/components/form';
	import { StringItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import ApiTypeItem from '~/lib/components/enums/api-type/ApiTypeItem.svelte';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { Api, MutationTypeApiArgs } from '~/lib/types/schema';

	export let node: MutationTypeApiArgs = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeApiArgs;
			update?: boolean;
			then: (data: Api | null | undefined) => void;
			catch: (errors: Errors) => void;
		};
		gotoSelect: {};
		back: {};
	}>();

	const save = (): void => {
		if (node) {
			dispatch('mutation', {
				args: node,
				then: (data) => {
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
				args: {},
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
		title={$LL.graphql.objects.Api.name()}
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
		<StringItem label={$LL.graphql.objects.Api.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
		<StringItem label={$LL.graphql.objects.Api.fields.description.name()} name="description" bind:value={node.description} errors={errors.description} />
		<ApiTypeItem label={$LL.graphql.objects.Api.fields.type.name()} name="type" bind:value={node.type} errors={errors.type} />
		<ObjectItem name="role" path="_/role" label={$LL.graphql.objects.Api.fields.role.name()} errors={errors.role} on:gotoField />
		<ObjectItem name="realm" path="_/realm" label={$LL.graphql.objects.Api.fields.realm.name()} errors={errors.realm} on:gotoField />
	</Form>
</Card>