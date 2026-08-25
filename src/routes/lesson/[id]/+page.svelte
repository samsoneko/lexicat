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
            if (data.exercises[currentIndex].type !== "info" && data.exercises[currentIndex].type !== "vocab") {
                isCorrect = false;
            }
        } else {
            lessonComplete = true;
            currentIndex += 1;
        }
        console.dir(scorableLessons);
    }

    // API result submission function
    async function submitResults() {
        const finalPercentage = Math.round((score / scorableLessons) * 100);
        
        await fetch(`/api/lesson-complete`, {
            method: 'POST',
            body: JSON.stringify({
                lessonId: data.lessonId,
                words: data.words,
                score: finalPercentage
            })
        });

        goto('/');
    }
</script>

<LessonProgressBar totalAnswerCount={data.exercises.length} currentAnswerCount={currentIndex}/>

{#if !lessonComplete}
    {#if data.exercises.length === 0}
        <p>No content available yet.</p>
    {:else}
        <!-- Debug for now -->
        <section>
            <div>
                <h2>Part {currentExercise.index} - {String(currentExercise.type).charAt(0).toUpperCase() + String(currentExercise.type).slice(1).replaceAll('_', ' ')}</h2>
            </div>

            <div>
                {#if currentExercise.type === 'info'}
                    <InfoExercise content={currentExercise.content} vocab={data.vocabulary} bind:isCorrect/>
                {:else if currentExercise.type === 'vocab'}
                    <VocabExercise content={currentExercise.content} vocab={data.vocabulary} bind:isCorrect />
                {:else if currentExercise.type === 'multiple_choice'}
                    <MultichoiceExercise content={currentExercise.content} vocab={data.vocabulary} bind:score bind:isCorrect />
                {:else if currentExercise.type === 'arrange'}
                    <ArrangeExercise content={currentExercise.content} vocab={data.vocabulary} bind:score bind:isCorrect />
                {:else if currentExercise.type === 'word_bank'}
                    <WordBankExercise content={currentExercise.content} vocab={data.vocabulary} bind:score bind:isCorrect />
                {:else if currentExercise.type === 'translate'}
                    <TranslateExercise content={currentExercise.content} vocab={data.vocabulary} bind:score bind:isCorrect />
                {:else if currentExercise.type === 'pairs'}
                    <PairsExercise content={currentExercise.content} vocab={data.vocabulary} bind:score bind:isCorrect />
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
    Lesson complete
    <p>Your Score is: {Math.round((score / scorableLessons) * 100)}%</p>
    <button class="button-default" onclick={submitResults} >
        End Lesson
    </button>
{/if}