<script>
    import WordTile from "$lib/components/WordTile.svelte";
    let { data } = $props();

</script>

<h2>Words you've already unlocked:</h2>

<div class="vocab-area">
    {#each data.vocabulary as word}
        <WordTile word={word.word} translation={word.translation} pos={word.pos}/>
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
