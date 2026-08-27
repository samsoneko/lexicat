<script>
	import { onMount } from 'svelte';
	let {isCorrect = $bindable(), vocab = $bindable(), content} = $props();

    onMount(() => {
        isCorrect = true;
    });

</script>

<h3>{@html content["title"]}</h3>

<div class="info-panel">
    {@html content["text"]}
</div>