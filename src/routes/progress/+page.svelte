<script lang="ts">
    import { readable } from 'svelte/store';

	let { data } = $props();

    const totalScoresSum = data.progress.reduce((sum, item) => sum + item.score, 0);
    const calculatedAccuracy = Math.round(totalScoresSum / data.progress.length);
</script>

<h1>Your Progress</h1>
<hr class="page-spacer">
{#if data.progress}
    {#each data.progress as entry}
    <div>
        {entry.score}%
    </div>
    {/each}

    <h3>Current overall accuracy:</h3>
    <p>{calculatedAccuracy}%</p>

    <h3>Total lessons done:</h3>
    <p>{data.progress.length}</p>
{/if}