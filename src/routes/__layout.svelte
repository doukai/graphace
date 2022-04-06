<!-- <script lang="ts" context="module">
	import { client } from '$lib/GraphqlClient';
	import { gql } from 'graphql-request';
	import { TypeManager } from '$lib/TypeManager';
	import type { Load } from '@sveltejs/kit';
	import type { __Type } from '$lib/__Type';
	const manager = new TypeManager();
	debugger;

	type Response = { data: Data };
	type Data = { __typeList: Array<__Type> };
	type Output = { __typeList: Array<__Type> };
	export const load: Load<null, null, Output> = async () => {
		debugger;
		const query = gql`
			query {
				__typeList(kind: { val: OBJECT }) {
					name
					description
				}
			}
		`;
		const { data } = await client.request<Response>(query);
			debugger

		return {
			props: {
				__typeList: data.__typeList
			}
		};
	};
</script> -->
<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import SideBar from '@components/ui/SideBar.svelte';
	import NavBar from '@components/ui/NavBar.svelte';
	import { isOpen } from '$lib/stores/Menu';
	debugger;

	onMount(() => {
		themeChange(false);
	});
	// export let __typeList: Array<__Type>;
</script>

<div>
	<div class={$isOpen ? 'hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0' : 'hidden'}>
		<SideBar />
	</div>
	<div class={$isOpen ? 'md:pl-64 flex flex-col' : 'flex flex-col'}>
		<NavBar />
		<main class="flex-1">
			<div class="py-6">
				<div class="overflow-hidden max-w-full mx-auto px-4 sm:px-6 md:px-8">
					<slot />
				</div>
			</div>
		</main>
	</div>
</div>
