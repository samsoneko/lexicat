<script lang="ts">
    import { readable } from 'svelte/store';

	let { data } = $props();

</script>

<h1>Training</h1>
<p>This is where training options will appear</p>
{#if data.wordMap}
    {#each data.wordMap as userWord}
    <div>
        {userWord.slug}
    </div>
    {/each}
{/if}