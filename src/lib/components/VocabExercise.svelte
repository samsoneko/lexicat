<script>
	import { onMount } from 'svelte';
    import WordTile from "$lib/components/WordTile.svelte";
	let {isCorrect = $bindable(), vocab = $bindable(), content} = $props();

    onMount(() => {
        isCorrect = true;
    });

</script>

<p class="exercise-prompt">New words introduced:</p>

<div class="vocab-area">
    {#each content["options"] as slug}
        <WordTile word={vocab[slug].word} translation={vocab[slug].translation} info={vocab[slug].info} pos={vocab[slug].pos}/>
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
