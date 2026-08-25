<script lang="ts">
    import { readable } from 'svelte/store';
    import { goto } from '$app/navigation';
    import InfoExercise from "$lib/components/InfoExercise.svelte";
    import VocabExercise from "$lib/components/VocabExercise.svelte";
    import MultichoiceExercise from "$lib/components/MultichoiceExercise.svelte";
    import ArrangeExercise from "$lib/components/ArrangeExercise.svelte";
    import WordBankExercise from "$lib/components/WordBankExercise.svelte";
    import TranslateExercise from '$lib/components/TranslateExercise.svelte';
    import PairsExercise from '$lib/components/PairsExercise.svelte';

	let { data } = $props();

    // Exercise state tracking
    let currentIndex = $state(0);
    let isCorrect = $state(false);
    let lessonComplete = $state(false);

    let score = $state(0);

    let currentExercise = $derived(data.exercises[currentIndex]);
    let progressPercentage = $derived((currentIndex / data.exercises.length) * 100);
    
    const scorableLessons = $derived(data.exercises.filter((exercise: { type: string }) => exercise.type !== 'info' && exercise.type !== 'vocab').length);

    function nextQuestion() {
        if (currentIndex < data.exercises.length - 1) {
            currentIndex += 1;
        } else {
            lessonComplete = true;
            currentIndex += 1;
        }
        isCorrect = false;
    }
</script>


<p>{progressPercentage}%</p>

{#if !lessonComplete}
    {#if data.exercises.length === 0}
        <p>No content available yet.</p>
    {:else}
        <!-- Debug for now -->
        <section>
            <div>
                <h2>Exercise {currentIndex+1}</h2>
                <h3>{currentExercise.type}</h3>
            </div>

            <div>
                {#if currentExercise.type === 'info'}
                    <InfoExercise content={currentExercise.content} bind:isCorrect/>
                {:else if currentExercise.type === 'vocab'}
                    <VocabExercise content={currentExercise.content} bind:isCorrect />
                {:else if currentExercise.type === 'multiple_choice'}
                    <MultichoiceExercise content={currentExercise.content} bind:score bind:isCorrect />
                {:else if currentExercise.type === 'arrange'}
                    <ArrangeExercise content={currentExercise.content} bind:score bind:isCorrect />
                {:else if currentExercise.type === 'word_bank'}
                    <WordBankExercise content={currentExercise.content} bind:score bind:isCorrect />
                {:else if currentExercise.type === 'translate'}
                    <TranslateExercise content={currentExercise.content} bind:score bind:isCorrect />
                {:else if currentExercise.type === 'pairs'}
                    <PairsExercise content={currentExercise.content} bind:score bind:isCorrect />
                {/if}
            </div>
        </section>

        {#if isCorrect}
            <button class="button-default" disabled={!isCorrect} onclick={nextQuestion} >
                Continue
            </button>
        {/if}
    {/if}
{:else}
    Training complete
    <p>Your Score is: {Math.round((score / scorableLessons) * 100)}%</p>
    <button class="button-default" aria-label="End training">
        <a href="/training" aria-label="End training">End Training</a>
    </button>
{/if}