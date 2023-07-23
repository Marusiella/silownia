<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  import Bar from "./Bar.svelte";
</script>

{#await data.props.x}
  <span class="loading loading-spinner loading-lg" />
{:then x}
  <h2>
    {JSON.stringify(x)}
  </h2>
  <div class="flex items-end w-full h-40">
    {#each x.z as m}
      <Bar {m} />
    {/each}
  </div>
  <div class="flex mt-4">
    {#each x.z as m}
      <div class="mx-2 w-6 text-center font-bold text-white">
        {#if m < 11}
          {m}
        {/if}
      </div>
    {/each}
  </div>
{/await}
