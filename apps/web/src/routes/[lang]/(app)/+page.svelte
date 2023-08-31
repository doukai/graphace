<script lang="ts">
	import Iconify from '@iconify/svelte';
</script>

<div class="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
	<a
		class="card w-full p-6 card-compact bg-base-100 hover:bg-base-300 transition-all duration-200 hover:-translate-y-1 shadow-xl"
		href="http://localhost:4000"
	>
		<div class={`text-xl font-semibold inline-block`}>SpectaQL</div>
		<div class="divider mt-2" />
		<div class="h-full w-full pb-6">
			<p class="flex">
				<Iconify class="w-12 h-12 inline-block mr-4" icon="icon-park:glasses-three" />
				Autogenerate static GraphQL API documentation
			</p>
		</div>
	</a>
	<a
		class="card w-full p-6 card-compact bg-base-100 hover:bg-base-300 transition-all duration-200 hover:-translate-y-1 shadow-xl"
		href="http://localhost:3000"
	>
		<div class={`text-xl font-semibold inline-block`}>GraphiQL</div>
		<div class="divider mt-2" />
		<div class="h-full w-full pb-6">
			<p class="flex">
				<Iconify class="w-12 h-12 inline-block mr-4" icon="logos:graphql" />
				GraphiQL & the GraphQL LSP Reference Ecosystem for building browser & IDE tools
			</p>
		</div>
	</a>
	<a
		class="card w-full p-6 card-compact bg-base-100 hover:bg-base-300 transition-all duration-200 hover:-translate-y-1 shadow-xl"
		href="http://localhost:3000/voyager"
	>
		<div class={`text-xl font-semibold inline-block`}>GraphQL Voyager</div>
		<div class="divider mt-2" />
		<div class="h-full w-full pb-6">
			<p class="flex">
				<Iconify class="w-12 h-12 inline-block mr-4" icon="twemoji:satellite" />
				Represent any GraphQL API as an interactive graph
			</p>
		</div>
	</a>
</div>
