<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  // export let form: FormData;
  import Bar from "./Bar.svelte";
</script>

<form action="?/clearcache" method="post">
  <button type="submit" class="btn btn-primary">Clear Cache</button>
</form>

{#await data.props.x}
  <span class="loading loading-spinner loading-lg" />
{:then x}
  <h2>
    {JSON.stringify(x)}
  </h2>
  <div class="flex mt-4">
    {#each x.z as m}
      <div class="mx-2 w-6 text-center font-bold text-white">
          {m.hour}
      </div>
    {/each}
  </div>
  <div class="flex items-end w-full h-40">
    {#each x.z as m}
      <Bar {m} />
    {/each}
  </div>
  <div class="flex mt-4">
    {#each x.z as m}
      <div class="mx-2 w-6 text-center font-bold text-white">
        {#if m.percent < 11}
          {m.percent}
        {/if}
      </div>
    {/each}
  </div>
{/await}
