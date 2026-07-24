<script lang="ts">
    import { readable } from 'svelte/store';
    import { goto } from '$app/navigation';
    import InfoLesson from "$lib/components/InfoLesson.svelte";
    import MultichoiceLesson from "$lib/components/MultichoiceLesson.svelte";
    import ArrangeLesson from "$lib/components/ArrangeLesson.svelte";
    import VocabLesson from "$lib/components/VocabLesson.svelte";

	let { data } = $props();

    // Exercise state tracking
    let currentIndex = $state(0);
    let isCorrect = $state(false);
    let lessonComplete = $state(false);

    let score = $state(0);

    let currentExercise = $derived(data.exercises[currentIndex]);
    let progressPercentage = $derived((currentIndex / data.exercises.length) * 100);

    function nextQuestion() {
        if (currentIndex < data.exercises.length - 1) {
            currentIndex += 1;
        } else {
            lessonComplete = true;
            currentIndex += 1;
        }
        isCorrect = false;
    }

    // API result submission function
    async function submitResults() {
        const scorableLessons = data.exercises.filter((exercise: { type: string }) => exercise.type === 'info' || exercise.type === 'vocab').length;
        const finalPercentage = Math.round((score / scorableLessons) * 100);
        
        await fetch(`/api/lesson-complete`, {
            method: 'POST',
            body: JSON.stringify({
                lessonId: data.lessonId,
                score: finalPercentage
            })
        });

        goto('/');
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
                <h2>Exercise {currentExercise.index}</h2>
                <h3>{currentExercise.type}</h3>
            </div>

            <div>
                {#if currentExercise.type === 'info'}
                    <InfoLesson content={currentExercise.content} bind:isCorrect/>
                {:else if currentExercise.type === 'vocab'}
                    <VocabLesson content={currentExercise.content} bind:isCorrect />
                {:else if currentExercise.type === 'multiple_choice'}
                    <MultichoiceLesson content={currentExercise.content} bind:score bind:isCorrect />
                {:else if currentExercise.type === 'arrange'}
                    <ArrangeLesson content={currentExercise.content} bind:score bind:isCorrect />
                {/if}
            </div>
        </section>

        {#if isCorrect}
            <button disabled={!isCorrect} onclick={nextQuestion} >
                Next exercise
            </button>
        {/if}
    {/if}
{:else}
    Lesson complete
    <button onclick={submitResults} >
        End lesson
    </button>
{/if}