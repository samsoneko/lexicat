<script>
	import { onMount } from 'svelte';
	let {isCorrect = $bindable(), content} = $props();

    onMount(() => {
        isCorrect = true;
    });

</script>

<p>{content["options"]}</p>