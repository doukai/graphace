<script lang="ts">
  import type { Error } from '@graphace/commons/types';
  import { nanoid } from 'nanoid';
  export let name: string;
  export let value: string;
  export let placeholder: string = '';
  export let className: string = '';
  export let error: Error = null;
  const id = nanoid();
</script>

<div class="form-control w-full max-w-xs">
  <input
    type="text"
    id="{id}"
    name="{name}"
    placeholder="{placeholder}"
    class="input input-bordered {error ? 'input-error' : ''} {className}"
    bind:value
  />
  {#if error && error.message}
    <label for="{id}" class="label">
      <span class="label-text-alt"><p class="text-error">{error.message}</p></span>
    </label>
  {/if}
</div>
