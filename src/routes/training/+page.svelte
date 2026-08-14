<script lang="ts">
    import { readable } from 'svelte/store';

	let { data } = $props();

    let todaysVocabulary = $derived.by(() => {
		let totalVocabulary = JSON.parse(JSON.stringify(data.wordMap)); // Create deep copy
        let todaysVocabulary : Object[] = [];
		for (const word of totalVocabulary) {
            const updatedDay = new Date(word.updated).getDate();
            const reviewDay = new Date(Date.now() + (60 * 60 * 24 * word.interval * 1000)).getDate();
            if (updatedDay === reviewDay) {
                todaysVocabulary.push(word);
            }
        }
        return todaysVocabulary;
    });
</script>

<h1>Training</h1>

<h2>Vocabulary Reviews</h2>
<p>Your vocabulary is already {data.wordMap.length} words large!</p>
<p>You have {todaysVocabulary.length} words to review today!</p>
{#if todaysVocabulary.length !== 0}
    <a href="/training/vocab">Review</a>
{/if}