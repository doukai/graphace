<script lang="ts">
	import { mutation } from '@urql/svelte';
	import { TypeManager, type __Type, __TypeKind } from '$lib/TypeManager';
	import { goto } from '$app/navigation';
	import Input from './Input.svelte';
	export let data: object;
	export let __type: __Type;

	const manager = new TypeManager();
	const mutationTypeFieldName = manager.getMutationTypeFieldName(__type.name);
	const mutationVariables = manager.fieldsToMutationVariables(__type);
	const mutationArguments = manager.fieldsToMutationArguments(__type);
	const selections = manager.fieldsToSelections(__type);
	const changeUrl = (url: string) => {
		goto(url, { keepfocus: true });
	};

	const mutationType = mutation({
		query: `#graphql
		mutation (${mutationVariables}) {
			${mutationTypeFieldName} (${mutationArguments}) {
				${selections}
			}
		}`
	});

	function save() {
		mutationType({ ...data }).then((result) => {
			data = result.data[mutationTypeFieldName];
		});
	}
</script>

<form class="space-y-8 divide-y divide-gray-200">
	<div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
		<div class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
			<div>
				<h3 class="text-lg leading-6 font-medium text-gray-900">{__type.name}</h3>
				{#if __type.description}
					<p class="mt-1 max-w-2xl text-sm text-gray-500">
						{__type.description}
					</p>
				{/if}
			</div>
			{#each __type.fields.filter((field) => !manager.fieldIsList(field.type) && manager.getFieldType(field.type) !== __TypeKind.OBJECT) as __field}
				<div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
					<div
						class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5"
					>
						<label
							for={__field.name}
							class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
						>
							{__field.name}
						</label>
						<div class="mt-1 sm:mt-0 sm:col-span-2">
							<Input {__field} bind:data={data[__field.name]} />
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="pt-5">
		<div class="flex justify-end">
			<button
				type="button"
				class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				on:click={(e) => {
					e.preventDefault();
					changeUrl(`/types/${manager.typeNameToUrl(__type.name)}`);
				}}
			>
				Cancel
			</button>
			<button
				type="submit"
				class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				on:click={(e) => {
					e.preventDefault();
					save();
				}}
			>
				Save
			</button>
		</div>
	</div>
</form>
