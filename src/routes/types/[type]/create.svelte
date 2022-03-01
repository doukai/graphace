<script lang="ts">
	import { TypeManager, type __Type } from '$lib/TypeManager';
	export let __type: __Type;

	const manager = new TypeManager();
	const typeObject = manager.createTypeObject(__type);
</script>

<div class="flex flex-col">
	<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
		<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
			<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
				<div class="bg-white">
					<div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
						<Form __type={typeObject} {id} />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
