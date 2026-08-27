<script lang="ts">
    import { goto } from '$app/navigation';
    import InfoExercise from "$lib/components/InfoExercise.svelte";
    import VocabExercise from "$lib/components/VocabExercise.svelte";
    import MultichoiceExercise from "$lib/components/MultichoiceExercise.svelte";
    import ArrangeExercise from "$lib/components/ArrangeExercise.svelte";
    import WordBankExercise from "$lib/components/WordBankExercise.svelte";
    import TranslateExercise from '$lib/components/TranslateExercise.svelte';
    import PairsExercise from '$lib/components/PairsExercise.svelte';
    
    import LessonProgressBar from '$lib/components/LessonProgressBar.svelte';

	let { data } = $props();

    // Exercise state tracking
    let currentIndex = $state(0);
    let isCorrect = $state(false);
    let lessonComplete = $state(false);

    let score = $state(0);

    let currentExercise = $derived(data.exercises[currentIndex]);
    
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

<LessonProgressBar totalAnswerCount={data.exercises.length} currentAnswerCount={currentIndex}/>

{#if !lessonComplete}
    {#if data.exercises.length === 0}
        <p>No content available yet.</p>
    {:else}
        <section class="centered-section center-text">
            <div>
                <h2 class="exercise-title">{String(currentExercise.type).charAt(0).toUpperCase() + String(currentExercise.type).slice(1).replaceAll('_', ' ')}</h2>
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
        <div class="center-text">
            <button class="continue-button" disabled={!isCorrect} onclick={nextQuestion}>Continue <i class="fas fa-arrow-right"></i></button>
        </div>
        {/if}
    {/if}
{:else}
    <div class="centered-section">
        <h2>Training complete</h2>
        <p>Your Score is: {Math.round((score / scorableLessons) * 100)}%</p>
        <button class="continue-button" onclick={() => goto("/training")}>End Lesson</button>
    </div>
{/if}

<style>
    .exercise-title {
        margin: 0px;
    }
</style>