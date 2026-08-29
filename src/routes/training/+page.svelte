<script lang="ts">
    import { goto } from '$app/navigation';

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
<hr class="page-spacer">

<h2>Exercises</h2>
<section class="centered-section">
<p>Select an exercise type and amount to review:</p>
<div>
    <select id="exercise-type" name="exercise-type" bind:value={selectedExercise}>
        <option value="multiple_choice">Multiple Choice</option>
        <option value="translate">Translate</option>
        <option value="word_bank">Word Bank</option>
        <option value="arrange">Arrange</option>
        <option value="pairs">Pairs</option>
    </select>
    <input type="number" min="1" max="10" bind:value={selectedNumber}/>
    <button class="default-button" onclick={() => goto("/training/exercise/" + selectedExercise + "/" + selectedNumber)}>Start exercises <i class="fas fa-dumbbell"></i></button>
</div>
</section>

<h2>Vocabulary</h2>
<section class="centered-section">
    <p>You have unlocked <b>{data.wordMap.length}</b> out of {data.totalVocabulary} words!</p>
    <button class="default-button" onclick={() => goto("/training/vocabulary")}>View vocabulary <i class="fas fa-book"></i></button>

    <p>You have <b>{todaysVocabulary.length}</b> words to review today!</p>
    {#if todaysVocabulary.length !== 0}
        <button class="default-button" onclick={() => goto("/training/srs")}>Review vocabulary <i class="fas fa-repeat"></i></button>
    {/if}
</section>