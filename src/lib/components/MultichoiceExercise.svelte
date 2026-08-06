<script>
	let {isCorrect = $bindable(), content, score = $bindable()} = $props();

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
        } else {
            alreadyTried = true;
        }
    }

</script>

<h3>{content["prompt"]}</h3>

{#if !isCorrect}
    {#each content["options"] as option}
        <button class="button-default" onclick={() => selectedAnswer = option}>
            {option}
        </button>
    {/each}
    
    <button class="button-default" onclick={checkAnswer} disabled={selectedAnswer === ""}>
        Check Answer
    </button>
    {#if alreadyTried}
        <p>Wrong!</p>
    {/if}
{:else}
    <p>Correct!</p>
{/if}