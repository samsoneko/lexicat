<script lang="ts">
    import { readable } from 'svelte/store';

	let { data } = $props();

    // Calculate all words that have to be reviewed today
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

    let currentIndex = $state(0);
    let currentVocab = $derived(todaysVocabulary[currentIndex]);
    let allVocabDone = $state(false);
    let isHidden = $state(true)

    function rateVocab(answer : number) {
        submitResults(currentVocab.id, answer)

        if (currentIndex < todaysVocabulary.length - 1) {
            currentIndex += 1;
            isHidden = true;
        } else {
            allVocabDone = true;
            currentIndex += 1;
            isHidden = true;
        }
    }

    async function submitResults(userWordId : string, answer : number) {
        
        await fetch(`/api/srs-update`, {
            method: 'POST',
            body: JSON.stringify({
                userWordId: userWordId,
                answer: answer
            })
        });
    }
</script>

{#if !allVocabDone}
    {#if todaysVocabulary.length === 0}
        <p>No content available yet.</p>
    {:else}
        <section>
            <div>
                <h2>Recall the translation of the following word</h2>
            </div>

            {currentVocab.word}

            {#if isHidden}
                <button class="default-button" onclick={() => (isHidden = false)} >
                    Show translation
                </button>
            {:else}
                {currentVocab.translation}
                How well do you remember this word
                <button class="default-button" onclick={() => (rateVocab(0))} >
                    Not at all
                </button>
                <button class="default-button" onclick={() => (rateVocab(1))} >
                    Felt familiar
                </button>
                <button class="default-button" onclick={() => (rateVocab(2))} >
                    Seemed easy to remember
                </button>
                <button class="default-button" onclick={() => (rateVocab(3))} >
                    Only hardly
                </button>
                <button class="default-button" onclick={() => (rateVocab(4))} >
                    Well
                </button>
                <button class="default-button" onclick={() => (rateVocab(5))} >
                    Very well
                </button>
            {/if}
        </section>
    {/if}
{:else}
    You have reviewed all words
    <button class="default-button" aria-label="End reviews">
        <a href="/training" aria-label="End reviews">End reviews</a>
    </button>
{/if}