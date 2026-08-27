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
    
    <div>
        <button class="default-button" onclick={checkAnswer} disabled={selectedAnswer === ""}>
            Check Answer
        </button>
    </div>
    {#if alreadyTried}
        <p>Wrong!</p>
    {/if}
{:else}
    <p>Correct!</p>
{/if}