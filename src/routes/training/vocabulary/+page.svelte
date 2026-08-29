<script lang="ts">
    import WordTile from "$lib/components/WordTile.svelte";
    let { data } = $props();

</script>

<div class="vocab-area">
    <h2>Your words:</h2>
    
    {#if data.vocabulary.length === 0}
            <p>You have not unlocked any words yet.</p>
    {:else}
        {#each data.vocabulary as word}
            <WordTile word={word.word} translation={word.translation} info={word.info} pos={word.pos}/>
        {/each}
    {/if}
</div>

<style>
    .vocab-area {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 8px;
    }
</style>
