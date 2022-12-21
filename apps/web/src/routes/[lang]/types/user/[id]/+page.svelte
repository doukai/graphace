<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { __Schema, __Type, __TypeKind } from '@graphace/graphql/types';
	import type { Error } from '@graphace/commons/types';
	import { TypeManager } from '@graphace/graphql/types/TypeManager';
	import {
		Form,
		FormLoading,
		FormItems,
		FormItem,
		FormButtons
	} from '@graphace/ui/components/form';
	import {
		Input,
		NumberInput,
		InputList,
		NumberInputList,
		Toggle,
		ToggleList
	} from '@graphace/ui/components/input';
	import { __schema } from '~/gql/generated/introspection.json';
	import { FieldInput, ObjectEditButton } from '@graphace/ui-graphql/components/introspection';
	import { messageBoxs } from '@graphace/ui/components/MessageBoxs.svelte';
	import { notifications } from '@graphace/ui/components/Notifications.svelte';
	import { validate } from '@graphace/graphql/schema/JsonSchema';
	import LL from '~/i18n/i18n-svelte';
	import { locale } from '~/i18n/i18n-svelte';
	import type {
		Conditional,
		Operator,
		QueryUser$input,
		QueryUser$result,
		MutationUser$input,
		QueryUserStore
	} from '$houdini';
	import { GQL_MutationUser } from '$houdini';
	import type { PageData } from './$houdini';
	import { goto } from '$app/navigation';

	export let data: PageData;
	$: QueryUser = data.QueryUser as QueryUserStore;
	$: user = $QueryUser.data?.user as MutationUser$input | null | undefined;

	let errors: Record<string, Error> = {};

	const save = (): void => {
		if (user) {
			validate('User', user, $locale)
				.then((data) => {
					errors = {};
					if (user) {
						GQL_MutationUser.mutate(user)
							.then((result) => {
								user = result?.user as MutationUser$input;
								notifications.success($LL.message.saveSuccess());
							})
							.catch((error) => {
								console.error(error);
								notifications.error($LL.message.saveFailed());
							});
					}
				})
				.catch((validErrors) => {
					errors = validErrors;
				});
		}
	};

	const remove = (): void => {
		if (user) {
			user.isDeprecated = true;
			GQL_MutationUser.mutate(user)
				.then((result) => {
					notifications.success($LL.message.removeSuccess());
				})
				.catch((error) => {
					console.error(error);
					notifications.error($LL.message.removeFailed());
				});
		}
	};
</script>

{#if user}
	<Form>
		<FormItems title={'User'}>
			<FormItem label={'name'} let:id>
				<Input name={'name'} {id} bind:value={user.name} error={errors.name} />
			</FormItem>
			<FormItem label={'login'} let:id>
				<Input name={'login'} {id} bind:value={user.login} error={errors.login} />
			</FormItem>
			<FormItem label={'password'} let:id>
				<Input name={'password'} {id} bind:value={user.password} error={errors.password} />
			</FormItem>
		</FormItems>
		<FormButtons>
			<button
				class="btn"
				on:click={(e) => {
					e.preventDefault();
					goto('../user');
				}}
			>
				{$LL.components.graphql.editor.backBtn()}
			</button>
			<button
				class="btn"
				on:click={(e) => {
					e.preventDefault();
					save();
				}}
			>
				{$LL.components.graphql.editor.saveBtn()}
			</button>
			<button
				class="btn btn-outline btn-error"
				on:click={(e) => {
					e.preventDefault();
					messageBoxs.open({
						title: $LL.components.graphql.table.removeModalTitle(),
						buttonName: $LL.components.graphql.table.removeBtn(),
						buttonType: 'error',
						confirm: () => {
							remove();
							return true;
						}
					});
				}}
			>
				{$LL.components.graphql.editor.removeBtn()}
			</button>
		</FormButtons>
	</Form>
{:else}
	<FormLoading />
{/if}
