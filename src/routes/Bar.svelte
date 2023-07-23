<script lang="ts">
    export let m: number;
    import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
    
  const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
        
        $: progress.set(m);
        
</script>

<div class="mx-2 bg-white w-6 text-center font-bold text-black" style={`height: ${$progress}%`} >
    {#if m >= 11}
    {m}
    {/if}
</div>