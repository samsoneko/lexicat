<script>
    let { form } = $props(); 
</script>

<section class="centered-section center-text">
    <h1>Create an Account</h1>

    {#if form?.error}
        <p style="color: red;">{form.error}</p>
    {/if}

    <!-- Form for registering -->
    <form class="register-form" method="POST">
        <label>
            <input type="text" name="username" placeholder="Username" value={form?.username ?? ''} required />
        </label>

        <label>
            <input type="email" name="email" placeholder="Email" value={form?.email ?? ''} required />
        </label>
        
        <label>
            <input type="password" name="password" placeholder="Password" required />
        </label>

        <button class="default-button" type="submit">Register</button>
    </form>

    <p>Already have an account? <a href="/login">Log in here</a></p>
</section>

<style>
    .register-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
</style>