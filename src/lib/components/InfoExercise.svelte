<script>
	import { onMount } from 'svelte';
	let {isCorrect = $bindable(), vocab = $bindable(), content} = $props();

    onMount(() => {
        isCorrect = true;
    });

</script>

<h3>{content["title"]}</h3>
<p>{@html content["text"]}</p>