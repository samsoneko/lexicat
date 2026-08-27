<script lang="ts">
    import { goto } from '$app/navigation';
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
        <button type="submit" class="default-button">
            {data.theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
    </form>
    
    <!-- The Logout button form -->
    <form method="POST" action="/logout">
        <button type="submit" class="default-button">Log Out</button>
    </form>

    <button class="default-button" onclick={() => goto("/course")}>Change my course</button>

    <form method="POST" action="?/deleteAccount">
        <button type="submit" class="default-button" onclick={(event) => {if(!confirm('Do you really want to delete your account?')) {event.preventDefault();}}}>Delete my account</button>
    </form>
{/if}