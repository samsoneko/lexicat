<script lang="ts">
    import { goto } from '$app/navigation';

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

<section class="centered-section">
    {#if !allVocabDone}
        {#if todaysVocabulary.length === 0}
            <p>No content available yet.</p>
        {:else}
                <h2>Vocabulary review</h2>
                <h3>Recall the meaning of the following word:</h3>

                <div class="srs-tile">
                    <h3 class="srs-text">{currentVocab.word}</h3>
                    {#if !isHidden}
                        <hr>
                        <p class="srs-text">{currentVocab.translation}</p>
                    {/if}
                </div>

                {#if isHidden}
                    <button class="default-button" onclick={() => (isHidden = false)} >
                        Show translation
                    </button>
                {:else}
                    <h3>How well did you remember this word?</h3>
                    <button class="default-button srs-button srs-5-color" onclick={() => (rateVocab(5))} >
                        Very well
                    </button>
                    <button class="default-button srs-button srs-4-color" onclick={() => (rateVocab(4))} >
                        Well
                    </button>
                    <button class="default-button srs-button srs-3-color" onclick={() => (rateVocab(3))} >
                        Only hardly
                    </button>
                    <button class="default-button srs-button srs-2-color" onclick={() => (rateVocab(2))} >
                        Seemed easy
                    </button>
                    <button class="default-button srs-button srs-1-color" onclick={() => (rateVocab(1))} >
                        Felt familiar
                    </button>
                    <button class="default-button srs-button srs-0-color" onclick={() => (rateVocab(0))} >
                        Not at all
                    </button>
                {/if}
        {/if}
    {:else}
        <h2>You have reviewed all words</h2>
        <button class="default-button" onclick={() => goto("/training")}>End reviews</button>
    {/if}
</section>

<style>
    .srs-tile {
        width: 200px;
        background-color: var(--layer-1);
        padding: var(--padding-s);
        border: var(--border);
        box-shadow: var(--box-shadow);
        border-radius: var(--border-radius-s);
        text-align: center;
        margin-bottom: 16px;
    }

    .srs-text {
        margin: 0px;
    }

    .srs-button {
        width: 160px;
    }

    .srs-5-color {
        border: 3px solid var(--violet-light);
    }

    .srs-4-color {
        border: 3px solid var(--sky-light);
    }

    .srs-3-color {
        border: 3px solid var(--emerald-light);
    }

    .srs-2-color {
        border: 3px solid var(--yellow-light);
    }

    .srs-1-color {
        border: 3px solid var(--orange-light);
    }

    .srs-0-color {
        border: 3px solid var(--red-light);
    }
</style>