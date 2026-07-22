<script lang="ts">
    import { readable } from 'svelte/store';

	let { data, children } = $props();
</script>

<h1>Hi, {data.user.username}!</h1>
<p>On this page, you find your lessons</p>

{#if data.chapters.length === 0}
    <p>No content available yet.</p>
{:else}
    {#each data.chapters as chapter}
        <!-- Chapter Header Container -->
        <section>
            <div>
                <span>
                    Chapter {chapter.index}
                </span>
                <h2>{chapter.title}</h2>
            </div>

            <!-- Lessons Grid / Stack Layout -->
            <div>
                {#each chapter.lessons as lesson}
                    <a href="/lesson/{lesson.id}">
                        <div>
                            <!-- Type Icon Anchor -->
                            <div>
                                <p>{#if lesson.type === 'vocab'}📝{:else if lesson.type === 'grammar'}🗣️{:else}🌟{/if} {lesson.title} ({lesson.type} Lesson)</p>
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        </section>
    {/each}
{/if}