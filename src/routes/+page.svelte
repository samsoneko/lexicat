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

    // Checks if all previous lessons have already been completed for a lesson
    function isLessonUnlocked(l_index = 0, c_index = 0) {
        if (c_index === 0) {
            if (l_index === 0) {
                return true
            }
            else {
                if (completedLessonIds.has(data.chapters[c_index].lessons[l_index-1].id)) {
                    return true
                }
            }
        }
        else {
            if (l_index === 0) {
                if (completedLessonIds.has(data.chapters[c_index-1].lessons.slice(-1)[0].id)) {
                    return true
                }
            }
            else {
                if (completedLessonIds.has(data.chapters[c_index].lessons[l_index-1].id)) {
                    return true
                }
            }
        }
        return false
    }
</script>

<div class="chapter-section">
    {#if data.user}
        <h1>Hi, {data.user.username}!</h1>
        <hr class="page-spacer">
        <p>Ready to improve your language capabilities?</p>
    {/if}
</div>

{#if data.chapters.length === 0}
    <p>No content available yet.</p>
{:else}
    {#each data.chapters as chapter, c_index}
        <!-- Chapter Header Container -->
        <section>
            <div>
                <h2 class="chapter-title">
                    Chapter {chapter.index} - {chapter.title}
                </h2>
                <p class="chapter-description">
                    {chapter.description}
                </p>
            </div>

            <!-- Lessons Grid / Stack Layout -->
            <div class='chapter-section'>
                {#each chapter.lessons as lesson, l_index}
                    <div class='lesson-panel' style='--block-color:{isLessonUnlocked(l_index, c_index) === true ? getChapterColor(chapter.index) : 'grey'}; --offset:{getHorizontalOffset(chapter.lessons.length, lesson.index)}px'>
                        <div>
                            {#if lesson.type === 'vocab'}
                                <i class="lesson-icon fas fa-book"></i>
                            {:else if lesson.type === 'grammar'}
                                <i class="lesson-icon fas fa-spell-check"></i>
                            {:else if lesson.type === 'review'}
                                <i class="lesson-icon fas fa-repeat"></i>
                            {:else}
                                <i class="lesson-icon fas fa-question"></i>
                            {/if}
                            <div class='lesson-textarea'>
                                <p class='lesson-subtitle'>Lesson {chapter.index}.{lesson.index} - {String(lesson.type).charAt(0).toUpperCase() + String(lesson.type).slice(1)}</p>
                                <p class='lesson-title'>{lesson.title}</p>
                            </div>
                        </div>
                        {#if isLessonUnlocked(l_index, c_index)}
                            <a class='lesson-start-button' href="/lesson/{lesson.id}">
                                {#if completedLessonIds.has(lesson.id)}
                                    Review
                                {:else}
                                    Start
                                {/if}
                            </a>
                        {/if}
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

    .chapter-title {
        text-align: center;
        margin-bottom: 0px;
    }

    .chapter-description {
        text-align: center;
        color: var(--subtext-color);
        margin-top: 8px;
        margin-bottom: 32px;
    }

    .lesson-panel {
        background-color: var(--block-color);
        padding: var(--padding-s);
        width: 360px;
        border-radius: var(--border-radius);
        margin: 0px 0px 16px var(--offset);
        display: flex;
        justify-content: space-between;
    }

    .lesson-icon {
        color: rgba(0, 0, 0, 0.4);
        font-size: 2.5rem;
        margin-right: 12px;
    }

    .lesson-textarea {
        display: inline-block;
        text-align: left;
    }

    .lesson-subtitle {
        color: rgba(255, 255, 255, 0.5);
        font-size: 1rem;
        margin: 0px;
    }

    .lesson-title {
        font-size: 1rem;
        color: white;
        margin: 0px;
    }

    .lesson-start-button {
        background-color: rgba(0, 0, 0, 0.4);
        color: white;
        box-shadow: var(--box-shadow);
        border-radius: var(--border-radius);
        padding: 10px;
        cursor: pointer;
        width: 50px;
    }

    .lesson-start-button:hover {
        background-color: rgba(0, 0, 0, 0.3);
        transform: scale(1.1);
    }
</style>