<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Errors, GraphQLError } from '@graphace/commons/types';
	import { Card } from '@graphace/ui/components/card';
	import { Form } from '@graphace/ui/components/form';
	import { StringItem, BooleanItem, ObjectItem } from '@graphace/ui-graphql/components/form';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import LL from '$i18n/i18n-svelte';
	import type { User, MutationTypeUserArgs } from '~/lib/types/schema';

	export let node: MutationTypeUserArgs = {};
	export let errors: Record<string, Errors> = {};
	export let showRemoveButton: boolean = true;
	export let showGotoSelectButton: boolean = false;
	export let showBackButton: boolean = true;

	const dispatch = createEventDispatcher<{
		mutation: {
			args: MutationTypeUserArgs;
			update?: boolean;
			then: (data: User | null | undefined) => void;
			catch: (errors: GraphQLError[]) => void;
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
		title={$LL.graphql.objects.User.name()}
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
		<StringItem label={$LL.graphql.objects.User.fields.name.name()} name="name" bind:value={node.name} errors={errors.name} />
		<StringItem label={$LL.graphql.objects.User.fields.lastName.name()} name="lastName" bind:value={node.lastName} errors={errors.lastName} />
		<StringItem label={$LL.graphql.objects.User.fields.login.name()} name="login" bind:value={node.login} errors={errors.login} />
		<StringItem label={$LL.graphql.objects.User.fields.email.name()} name="email" bind:value={node.email} errors={errors.email} />
		<StringItem label={$LL.graphql.objects.User.fields.phones.name()} name="phones" bind:value={node.phones} list errors={errors.phones} />
		<BooleanItem label={$LL.graphql.objects.User.fields.disable.name()} name="disable" bind:value={node.disable} errors={errors.disable} />
		<ObjectItem name="groups" path="_/groups" label={$LL.graphql.objects.User.fields.groups.name()} errors={errors.groups} on:gotoField />
		<ObjectItem name="roles" path="_/roles" label={$LL.graphql.objects.User.fields.roles.name()} errors={errors.roles} on:gotoField />
		<ObjectItem name="realm" path="_/realm" label={$LL.graphql.objects.User.fields.realm.name()} errors={errors.realm} on:gotoField />
	</Form>
</Card>