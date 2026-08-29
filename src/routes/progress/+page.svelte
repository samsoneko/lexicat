<script lang="ts">
    import { readable } from 'svelte/store';

	let { data } = $props();

    let totalScoresSum = $derived(data.progress.reduce((sum, item) => sum + item.score, 0));
    let calculatedAccuracy = $derived(Math.round(totalScoresSum / data.progress.length));

    let initialLessons = $derived(data.progress.filter(entry => entry.type === "initial").length);
    let reviewLessons = $derived(data.progress.filter(entry => entry.type === "review").length);
</script>

<h1>Your Progress</h1>
<hr class="page-spacer">
{#if data.progress}
    <!-- Lesson section -->
    <h2>Lessons</h2>
    <div class="progress-grid-wrapper">
        <div class="progress-panel accuracy-panel">
            <p class="progress-description">Current Overall Accuracy:</p>
            <p class="total-accuracy">{isNaN(calculatedAccuracy) ? '0': calculatedAccuracy}%</p>
        </div>

        <div class="progress-panel lesson-progress-panel">
            <p class="progress-description">Total Lesson Progress:</p>
            <p class="lesson-progress">{initialLessons}/{data.totalCourseLessons} ({(initialLessons/data.totalCourseLessons*100).toFixed(2)}%)</p>
        </div>

        <div class="progress-panel total-lessons-panel">
            <p class="progress-description">Lessons done:</p>
            <div class="lesson-counter-div">
                <div>
                    <p class="progress-description">Total</p>
                    <p class="lesson-progress">{data.progress.length}</p>
                </div>
                <div>
                    <p class="progress-description">Initial</p>
                    <p class="lesson-progress">{initialLessons}</p>
                </div>
                <div>
                    <p class="progress-description">Review</p>
                    <p class="lesson-progress">{reviewLessons}</p>
                </div>
            </div>
        </div>
    </div>
    

    <!-- Vocabulary section -->
    <h2>Vocabulary</h2>
    <div class="vocab-panel">
        <p class="progress-description">Total vocabulary:</p>
        <p class="total-vocab">{data.totalUserVocabulary}/{data.totalCourseVocabulary}</p>
    </div>
{/if}

<style>
    .progress-grid-wrapper {
        display: grid;
        gap: 8px;
        grid-template-areas:
            "a a b b"
            "a a c c";
        justify-content: center;
    }

    .progress-panel {
        padding: var(--padding-s);
        border: var(--border);
        background-color: var(--layer-1);
        color: var(--text-color);
        box-shadow: var(--box-shadow);
        border-radius: var(--border-radius-s);
        text-align: center;
    }

    .accuracy-panel {
        grid-area: a;
    }

    .lesson-progress-panel {
        grid-area: b;
    }

    .total-lessons-panel {
        grid-area: c;
    }

    .progress-description {
        color: var(--subtext-color);
        margin: 0px 0px 10px 0px;
    }

    .total-accuracy {
        font-size: 4rem;
        margin: 50px 0px 0px 0px;
        color: var(--emerald-light);
    }

    .lesson-progress {
        font-size: 2rem;
        margin: 0px;
    }

    .lesson-counter-div {
        display: flex;
        justify-content: space-between;
    }

    .vocab-panel {
        padding: var(--padding-s);
        border: var(--border);
        background-color: var(--layer-1);
        color: var(--text-color);
        box-shadow: var(--box-shadow);
        border-radius: var(--border-radius-s);
        text-align: center;
        display: flex;
        flex-direction: column;
        margin: auto;
        width: min-content;
    }

    .total-vocab {
        font-size: 4rem;
        margin: 0px;
        color: var(--emerald-light);
    }
</style>