<script lang="ts">
  export let isModalOpen: boolean = false;
  export let title: string;
  export let className: string = '';

  let modal: HTMLDivElement;
  $: if (isModalOpen) {
    if (modal) {
      document.body.appendChild(modal);
    }
  }
</script>

<div class="modal" class:modal-open="{isModalOpen}" bind:this="{modal}">
  <div class="modal-box {className}">
    <h2 class="font-bold text-lg">{title}</h2>
    <slot />
  </div>
</div>
