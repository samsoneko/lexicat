<script>
	import { onMount } from 'svelte';
	let {isCorrect = $bindable(), content} = $props();

    onMount(() => {
        isCorrect = true;
    });

</script>

<h3>{content["title"]}</h3>
<p>{content["text"]}</p>