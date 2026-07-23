<script>
	let {isCorrect = $bindable(), content} = $props();

    function checkAnswer() {
        isCorrect = true;
    }

</script>

{content}

<button onclick={checkAnswer} >
    Check Answer
</button>