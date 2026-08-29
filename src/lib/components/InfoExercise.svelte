<script>
	import { onMount } from 'svelte';
	let {isCorrect = $bindable(), vocab = $bindable(), content} = $props();

    onMount(() => {
        isCorrect = true;
    });

</script>

<p class="exercise-prompt">{@html content["title"]}</p>

<div class="info-panel">
    {@html content["text"]}
</div>