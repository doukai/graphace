<script lang="ts">
  import { ObjectEditButton } from '..';
  import type { __Type, __Field } from '@graphace/graphql/types';
  export let __parentType: __Type;
  export let __field: __Field;
  export let id: string;
  export let value: object;
</script>

<td>
  <ObjectEditButton
    __parentType="{__parentType}"
    __field="{__field}"
    id="{id}"
    bind:value
    className="btn-xs btn-ghost"
  />
</td>
