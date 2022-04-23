<script lang="ts">
	export let isModalOpen: boolean = false;
	export let title: string;
</script>

<div class="modal modal-bottom sm:modal-middle" class:modal-open={isModalOpen}>
	<div class="modal-box relative">
		<h3 class="font-bold text-lg">{title}</h3>
		<slot />
	</div>
</div>
