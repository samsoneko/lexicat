<!-- Minor variation of the arrange exercise, where some of the available words can be optional -->
<script>
	let {isCorrect = $bindable(), vocab = $bindable(), content, score = $bindable()} = $props();

	const uniqueBlocks = $derived(content.options.map((word, index) => ({id: index,text: word})));

    let wordPool = $derived(
		uniqueBlocks.filter(word => !selectedWords.some(sel => sel.id === word.id))
	);
    let selectedWords = $state([]);

    let currentAttempt = $derived(selectedWords.map(word => word.text).join('')); // Joining without spaces to support both affixes and separate words
	let alreadyTried = $state(false);

    function selectWord(clickedBlock) {
		selectedWords.push(clickedBlock);
		wordPool = wordPool.filter(block => block.id !== clickedBlock.id);
	}

	function deselectWord(clickedBlock) {
		wordPool.push(clickedBlock);
		selectedWords = selectedWords.filter(block => block.id !== clickedBlock.id);
	}

	function checkAnswer() {
        if (currentAttempt === content["answer"].replaceAll(' ', '')) { // Check without spaces to support both affixes and separate words
            if (!alreadyTried) {
                isCorrect = true;
                score += 1;
            } else {
                isCorrect = true;
            }
			selectedWords = []; // Reset selected words to not carry them over into the next exercise
			alreadyTried = false;
        } else {
            alreadyTried = true;
        }
    }

</script>

<h2>{@html content["prompt"]}</h2>

{#if !isCorrect}
	<div>
		{#each selectedWords as word}
			<button class="option-button-active" onclick={() => deselectWord(word)}>
				{word.text}
			</button>
		{/each}
		{#if selectedWords.length === 0 && !isCorrect}
			<span>Tap the words to arrange them...</span>
		{/if}
	</div>
	<hr>
	<div>
		{#each wordPool as word}
			<button class="option-button" onclick={() => selectWord(word)}>
				{word.text}
			</button>
		{/each}
	</div>
	
	<div>
		<button class="default-button" onclick={checkAnswer} disabled={selectedWords.length === 0}>
			Check Answer
		</button>
	</div>

    {#if alreadyTried}
        <p>Wrong!</p>
    {/if}
{:else}
    <p>Correct!</p>
{/if}