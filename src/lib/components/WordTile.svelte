<script>
	let {word, translation, pos} = $props();

    function getPOSColor(pos = "noun") {
        if (pos === "noun") {
            return "CornflowerBlue"
        }
        else if (pos === "verb") {
            return "Coral"
        }
        else if (pos === "adjective") {
            return "LightGreen"
        }
        else if (pos === "adverb") {
            return "LightSalmon"
        }
        else if (pos === "pronoun") {
            return "MediumOrchid"
        }
        return "var(--subtext-color)"
    }
</script>

<div class="word-tile">
    <div>
        <p class="word">{word}</p>
        <p class="translation">{translation}</p>
    </div>
    <p class="pos" style='--pos-color:{getPOSColor(pos)}'>{pos}</p>
</div>

<style>
    .word-tile {
        width: 300px;
        background-color: var(--layer-1);
        padding: 12px;
        border: var(--border);
        box-shadow: var(--box-shadow);
        border-radius: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .translation {
        color: var(--subtext-color);
        font-size: 1rem;
        margin: 0px;
    }

    .word {
        font-size: 1.2rem;
        color: var(--text-color);
        margin: 0px;
    }

    .pos {
        color: var(--pos-color);
        font-size: 1rem;
        margin: 0px;
    }
</style>
