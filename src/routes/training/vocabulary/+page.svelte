<script>
    import WordTile from "$lib/components/WordTile.svelte";
    let { data } = $props();

</script>

<div class="vocab-area">
    <h2>Words you've already unlocked:</h2>
    
    {#each data.vocabulary as word}
        <WordTile word={word.word} translation={word.translation} info={word.info} pos={word.pos}/>
    {/each}
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
