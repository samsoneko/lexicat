<script lang="ts">
	let { data } = $props();
</script>

<h1>Profile</h1>

<!-- Change what information is displayed based on login status -->
{#if data.user}
    <!-- User is logged in -->
    <span>Hi, {data.user.username}! Nice to see you today.</span>

    <h3>Account Information</h3>
    <p>Username: {data.user.username}</p>
    <p>Email: {data.user.email}</p>
    <p>Date registered: {data.user.created}</p>

    <!-- Theme Toggle Form Submit -->
    <form method="POST" action="/api/theme" style="display: inline">
        <input type="hidden" name="theme" value={data.theme} />
        <button type="submit" class="button-default">
            {data.theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
    </form>
    
    <!-- The Logout button form -->
    <form method="POST" action="/logout">
        <button type="submit" class="button-default">Log Out</button>
    </form>

    <a href="/course">Change Course</a>

    <form method="POST" action="?/deleteAccount">
        <button type="submit" class="button-default" onclick={(event) => {if(!confirm('Do you really want to delete your account?')) {event.preventDefault();}}}>Delete my account</button>
    </form>
{/if}