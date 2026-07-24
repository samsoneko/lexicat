<script>
	let {isCorrect = $bindable(), content, score = $bindable()} = $props();

    let selectedAnswer = "";
    let alreadyTried = false;

    function checkAnswer() {
        if (selectedAnswer === content["answer"]) {
            if (!alreadyTried) {
                isCorrect = true;
                score += 1;
            } else {
                isCorrect = true;
            }
        } else {
            alreadyTried = true;
        }
    }

</script>

<h3>{content["prompt"]}</h3>

{#each content["options"] as option}
    <button onclick={() => selectedAnswer = option}>
        {option}
    </button>
{/each}

{#if !isCorrect}
    <button onclick={checkAnswer} >
        Check Answer
    </button>
{/if}