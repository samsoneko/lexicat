<script lang="ts">
    let { data } = $props();
</script>

<div>
    <h2>Select your desired course</h2>
    
    <form method="POST">
        <div class="options-div">
            {#each data.courses as course}
                <button class="default-button option-button" type="submit" name="course" value="{course.id}">{course.name.charAt(0).toUpperCase() + course.name.slice(1)}</button>
            {/each}
        </div>
    </form>
</div>

<style>
    .options-div {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .option-button {
        width: 200px;
    }
</style>