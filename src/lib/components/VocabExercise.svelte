<script>
	import { onMount } from 'svelte';
	let {isCorrect = $bindable(), vocab = $bindable(), content} = $props();

    onMount(() => {
        isCorrect = true;
    });

</script>

<p>{content["options"]}</p>