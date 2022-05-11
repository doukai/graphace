<script lang="ts">
	export let isModalOpen: boolean = false;
	export let title: string;
	export let className: string = '';
</script>

<div class="modal" class:modal-open={isModalOpen}>
	<div class="card bg-base-100 {className}">
		<div class="card-body">
			<h2 class="card-title">{title}</h2>
			<slot />
		</div>
	</div>
</div>
