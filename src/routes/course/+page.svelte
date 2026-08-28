<script>
    import { enhance } from '$app/forms';
    let { data } = $props();
</script>

<div>
    <h2>Select your desired course</h2>
    
    <form method="POST">
        <div class="options-div">
            <button class="default-button option-button" type="submit" name="course" value="lx">Lexin</button>
            <button class="default-button option-button" type="submit" name="course" value="sg">Sangot</button>
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