<script>
	let {isCorrect = $bindable(), vocab = $bindable(), content, score = $bindable()} = $props();

    let selectedAnswer = $state("");
    let alreadyTried = $state(false);

    function checkAnswer() {
        if (selectedAnswer === content["answer"]) {
            if (!alreadyTried) {
                isCorrect = true;
                score += 1;
            } else {
                isCorrect = true;
            }
			alreadyTried = false;
            selectedAnswer = "";
        } else {
            alreadyTried = true;
        }
    }

</script>

<h3>{@html content["prompt"]}</h3>

{#if !isCorrect}
    {#each content["options"] as option}
        <button class={selectedAnswer === option ? "option-button-active" : "option-button"} onclick={() => selectedAnswer = option}>
            {option}
        </button>
    {/each}

    {#if alreadyTried}
        <h2 class="wrong-label">Wrong!</h2>
    {/if}
    
    <div>
        <button class="check-button" onclick={checkAnswer} disabled={selectedAnswer === ""}>
            Check Answer
        </button>
    </div>
{:else}
    <h2 class="correct-label">Correct!</h2>
{/if}