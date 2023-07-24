<script lang="ts">
    export let m: I;
    import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import type { I } from '$lib';
    
  const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
        
        $: progress.set(m.percent);
        
</script>

<div class="mx-2 bg-white w-6 text-center font-bold text-black" style={`height: ${$progress}%`} >
    {#if m.percent >= 11}
    {m.percent}
    {/if}
</div>