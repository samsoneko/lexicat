<script>
    import { enhance } from '$app/forms';
    let { data } = $props();
</script>

<div>
    <h1>Select your desired course</h1>
    
    <form method="POST">
        <div>
            <button type="submit" name="course" value="lx">Lexin</button>
            <button type="submit" name="course" value="sg">Sangot</button>
        </div>
    </form>
</div>
