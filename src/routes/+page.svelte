<script lang="ts">
    let { data } = $props();

    const completedLessonIds = new Set(data.statistics.map(entry => entry.lesson));

    // Function for calculating an individual color based on the index of a chapter
    function getChapterColor(index = 0) {
        const hueShift = index * 100; 
        const hue = (hueShift) % 360; 
        
        const saturation = 60; 
        const lightness = 30;  

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    function getHorizontalOffset(total = 0, index = 0) {
        const sinOffset = Math.sin((index-1)*(Math.PI*2)/total)*60;

        return sinOffset;
    }
</script>

<div class="chapter-section">
    {#if data.user}
        <h1>Hi, {data.user.username}!</h1>
        <p>Ready to improve your language capabilities?</p>
    {/if}
</div>

{#if data.chapters.length === 0}
    <p>No content available yet.</p>
{:else}
    {#each data.chapters as chapter}
        <!-- Chapter Header Container -->
        <section>
            <div>
                <h2 class="center-text">
                    Chapter {chapter.index} - {chapter.title}
                </h2>
            </div>

            <!-- Lessons Grid / Stack Layout -->
            <div class='chapter-section'>
                {#each chapter.lessons as lesson}
                    <div class='lesson-panel' style='--block-color:{getChapterColor(chapter.index)}; --offset:{getHorizontalOffset(chapter.lessons.length, lesson.index)}px'>
                        {#if lesson.type === 'vocab'}
                            <i class="lesson-icon fas fa-language"></i>
                        {:else if lesson.type === 'grammar'}
                            <i class="lesson-icon fas fa-spell-check"></i>
                        {:else}
                            <i class="lesson-icon fas fa-question"></i>
                        {/if}
                        <p class='lesson-title'>{lesson.title}</p>
                        <a class='lesson-start-button' href="/lesson/{lesson.id}">
                            {#if completedLessonIds.has(lesson.id)}
                                Review
                            {:else}
                                Start
                            {/if}
                        </a>
                    </div>
                {/each}
            </div>
        </section>
    {/each}
{/if}

<style>
    .chapter-section {
        text-align: center;
        margin-bottom: 48px;
        display: grid;
        place-items: center;
    }

    .lesson-panel {
        background-color: var(--block-color);
        width: fit-content;
        padding: var(--padding);
        border-radius: var(--border-radius);
        margin: 0px 0px 16px var(--offset);
    }

    .lesson-icon {
        color: rgba(0, 0, 0, 0.5);
        font-size: 1rem;
    }

    .lesson-title {
        display: inline;
        font-size: 1rem;
    }

    .lesson-start-button {
        background-color: rgba(0, 0, 0, 0.5);
        color: var(--text-color);
        box-shadow: var(--box-shadow);
        border-radius: var(--border-radius);
        padding: 8px;
        cursor: pointer;
    }
</style>