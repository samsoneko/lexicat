<script lang="ts">
    import { readable } from 'svelte/store';

	let { data } = $props();

    const completedLessonIds = new Set(data.statistics.map(entry => entry.lesson));
</script>

{#if data.user}
<h1>Hi, {data.user.username}!</h1>
<p>On this page, you find your lessons</p>
{/if}

{#if data.chapters.length === 0}
    <p>No content available yet.</p>
{:else}
    {#each data.chapters as chapter}
        <!-- Chapter Header Container -->
        <section>
            <div>
                <h2>
                    Chapter {chapter.index}
                </h2>
                <h3>{chapter.title}</h3>
            </div>

            <!-- Lessons Grid / Stack Layout -->
            <div>
                {#each chapter.lessons as lesson}
                        <div>
                            <!-- Type Icon Anchor -->
                            <div>
                                <p>{#if lesson.type === 'vocab'}📝{:else if lesson.type === 'grammar'}🗣️{:else}🌟{/if} {lesson.title} ({lesson.type} Lesson)</p>
                                <a href="/lesson/{lesson.id}">
                                    {#if completedLessonIds.has(lesson.id)}
                                        Review
                                    {:else}
                                        Start
                                    {/if}
                                </a>
                            </div>
                        </div>
                    
                {/each}
            </div>
        </section>
    {/each}
{/if}