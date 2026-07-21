<script>
    let { form } = $props(); 
</script>

<h1>Create an Account</h1>

{#if form?.error}
    <p style="color: red;">{form.error}</p>
{/if}

<!-- Form for registering -->
<form method="POST">
    <label>
        Username:
        <input type="text" name="username" value={form?.username ?? ''} placeholder="e.g. polyglot123" required />
    </label>

    <label>
        Email:
        <input type="email" name="email" value={form?.email ?? ''} required />
    </label>
    
    <label>
        Password:
        <input type="password" name="password" required />
    </label>

    <button type="submit">Register</button>
</form>

<p>Already have an account? <a href="/login">Log in here</a></p>