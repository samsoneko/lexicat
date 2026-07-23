<script>
	let {isCorrect = $bindable(), content} = $props();

    let selectedAnswer = "";

    function checkAnswer() {
        if (selectedAnswer === content["answer"]) {
            isCorrect = true;
        }
    }

</script>

<h3>{content["prompt"]}</h3>

{#each content["options"] as option}
    <button onclick={() => selectedAnswer = option}>
        {option}
    </button>
{/each}

<button onclick={checkAnswer} >
    Check Answer
</button>