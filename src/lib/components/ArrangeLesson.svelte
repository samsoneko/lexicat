<script>
	let {isCorrect = $bindable(), content, score = $bindable()} = $props();

    function checkAnswer() {
        isCorrect = true;
    }

</script>

{content}

{#if !isCorrect}
<button onclick={checkAnswer} >
    Check Answer
</button>
{/if}