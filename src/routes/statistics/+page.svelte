<script lang="ts">
    import { readable } from 'svelte/store';

	let { data } = $props();

    const totalScoresSum = data.statistics.reduce((sum, item) => sum + item.score, 0);
    const calculatedAccuracy = Math.round(totalScoresSum / data.statistics.length);
</script>

<h1>Statistics</h1>
{#if data.statistics}
    {#each data.statistics as entry}
    <div>
        {entry.score}%
    </div>
    {/each}

    <h3>Current overall accuracy:</h3>
    <p>{calculatedAccuracy}%</p>

    <h3>Total lessons done:</h3>
    <p>{data.statistics.length}</p>
{/if}