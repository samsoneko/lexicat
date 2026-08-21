<script>
	let {isCorrect = $bindable(), vocab = $bindable(), content, score = $bindable()} = $props();

    let currentAnswer = $state("");
    let alreadyTried = $state(false);

    function checkAnswer() {
        if (currentAnswer.toLowerCase() === content["answer"].toLowerCase()) { // Compare lowercase strings
            if (!alreadyTried) {
                isCorrect = true;
                score += 1;
            } else {
                isCorrect = true;
            }
			alreadyTried = false;
            currentAnswer = "";
        } else {
            alreadyTried = true;
        }
    }

</script>

<h3>{content["prompt"]}</h3>

{#if !isCorrect}
    <form autocomplete="off" onsubmit={checkAnswer}>
        <input type="text" bind:value={currentAnswer} placeholder="Enter your answer"/>
        <button class="button-default" type="submit">Check Answer</button>
    </form>
    {#if alreadyTried}
        <p>Wrong!</p>
    {/if}
{:else}
    <p>Correct!</p>
{/if}