<script lang="ts">
    import { readable } from 'svelte/store';

	let { data } = $props();

    let selectedExercise = $state();
    let selectedNumber = $state(1);

    let todaysVocabulary = $derived.by(() => {
		let totalVocabulary = JSON.parse(JSON.stringify(data.wordMap)); // Create deep copy
        let todaysVocabulary : Object[] = [];
		for (const word of totalVocabulary) {
            const reviewDay = new Date(Date.parse(word.updated) + (60 * 60 * 24 * word.interval * 1000));
            const currentDay = new Date(Date.now());
            if (new Date(reviewDay).setHours(0, 0, 0, 0) <= new Date(currentDay).setHours(0, 0, 0, 0)) {
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

<h2>Exercise Training</h2>
<p>Here you can review exercises of a certain type to refine your abilities.</p>
<p>Depending on the amount of available exercises, there may be less exercises than your desired number.</p>
<div>
    <label for="cars">Choose a exercise type:</label>
    <select id="exercise-type" name="exercise-type" bind:value={selectedExercise}>
        <option value="multiple_choice">Multiple Choice</option>
        <option value="translate">Translate</option>
        <option value="word_bank">Word Bank</option>
        <option value="arrange">Arrange</option>
        <option value="pairs">Pairs</option>
    </select>
    <input type="number" min="1" max="10" bind:value={selectedNumber}/>
    <a href="/training/exercise/{selectedExercise}/{selectedNumber}">Start exercises</a>
</div>