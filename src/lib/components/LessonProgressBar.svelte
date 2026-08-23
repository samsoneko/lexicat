<script>
	let {totalAnswerCount = 0, currentAnswerCount = 0} = $props();
    let progress = $derived(currentAnswerCount / totalAnswerCount);
    let percentage = $derived(Math.round(progress*100));
</script>

<div class="panel-default accuracy-panel">
    <h4 class="accuracy-title center-text">Lesson Progress</h4>
    <div class="accuracy-bar-frame">
        <div class="accuracy-bar-background">
            <div class="accuracy-bar-content" style="--progress:{progress}"></div>
        </div>
    </div>
    <p class="accuracy-percentage center-text">{currentAnswerCount}/{totalAnswerCount} - {percentage}%</p>
</div>

<style>
    .accuracy-panel {
      margin-bottom: 16px;
    }

    .accuracy-title {
        margin-top: 0px;
        margin-bottom: 10px;
    }

    .accuracy-percentage {
        margin: 8px 0px 0px 0px;
    }

    .accuracy-bar-frame {
        background-color: var(--layer-2);
        border-radius: 16px;
        padding: 1px;
        box-shadow: var(--box-shadow);
    }

    .accuracy-bar-background {
        width: 100%;
        height: 20px;
        border-radius: 8px;
        background-color: var(--layer-1);
    }

    .accuracy-bar-content {
        width: calc(var(--progress) * 100%);
        height: 20px;
        border-radius: 8px;
        background-color: var(--active-color);
    }
</style>