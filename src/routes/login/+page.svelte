<script lang="ts">
    let { form } = $props();
</script>

<section class="centered-section center-text">
    <h1>Login</h1>

    {#if form?.error}
        <p style="color: red;">{form.error}</p>
    {/if}

    <!-- Form for registering -->
    <form class="login-form" method="POST">
        <label>
            <input type="identity" name="identity" placeholder="Username or Email" value={form?.identity ?? ''} required />
        </label>
        
        <label>
            <input type="password" name="password" placeholder="Password" required />
        </label>

        <button class="default-button" type="submit">Log In</button>
    </form>

    <p>New user? <a href="/register">Register here</a></p>
</section>

<style>
    .login-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
</style>