<script>
	let {isCorrect = $bindable(), vocab = $bindable(), content, score = $bindable()} = $props();

	// Create two word pools for the pairs
	const wordPool = content.answer
		.map((pair, index) => ({ id: `f-${index}`, pairId: index, text: pair[0], type: 'foreign' }))
		.sort(() => Math.random() - 0.5);

	const translationPool = content.answer
		.map((pair, index) => ({ id: `n-${index}`, pairId: index, text: pair[1], type: 'native' }))
		.sort(() => Math.random() - 0.5);

	// Variables for the currently selected word
	let selectedId = $state(null);       
	let selectedPairId = $state(null);   
	let selectedType = $state(null);     
	let matchedPairIds = $state(new Set());
	
	let alreadyTried = $state(false);

	function handleCardClick(word) {
		if (matchedPairIds.has(word.pairId) || selectedId === word.id) return; // Prevents clicking the same word counting as an error

		// First card selection
		if (selectedId === null) {
			selectedId = word.id;
			selectedPairId = word.pairId;
			selectedType = word.type;
			return;
		}

		// Second card selection, check if pair matches
		if (selectedPairId === word.pairId && selectedType !== word.type) {
			matchedPairIds.add(word.pairId);
			resetSelection();
			if (matchedPairIds.size === content.answer.length) {
				if (!alreadyTried) {
					isCorrect = true;
					score += 1;
				} else {
					isCorrect = true;
				}
				alreadyTried = false;
			}
		} else {
			alreadyTried = true;
			resetSelection();
		}
	}

	function resetSelection() {
		selectedId = null;
		selectedPairId = null;
		selectedType = null;
	}
</script>

<h2>Select the matching pairs</h2>

{#if !isCorrect}
	<div>
		{#each wordPool as word (word.id)}
			{#if !matchedPairIds.has(word.pairId)}
				<button class="button-option" disabled={matchedPairIds.has(word.pairId)} onclick={() => handleCardClick(word)}>
					{word.text}
				</button>
			{/if}
		{/each}
	</div>
	<hr>
	<div>
		{#each translationPool as word (word.id)}
			{#if !matchedPairIds.has(word.pairId)}
				<button class="button-option" disabled={matchedPairIds.has(word.pairId)} onclick={() => handleCardClick(word)}>
					{word.text}
				</button>
			{/if}
		{/each}
	</div>
{:else}
    <p>Correct!</p>
{/if}