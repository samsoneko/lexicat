<script>
    let { form } = $props();
</script>

<h1>Login</h1>

{#if form?.error}
    <p style="color: red;">{form.error}</p>
{/if}

<!-- Form for registering -->
<form method="POST">
    <label>
        Username or Email:
        <input type="identity" name="identity" value={form?.identity ?? ''} required />
    </label>
    
    <label>
        Password:
        <input type="password" name="password" required />
    </label>

    <button type="submit">Log In</button>
</form>

<p>New user? <a href="/register">Register here</a></p>