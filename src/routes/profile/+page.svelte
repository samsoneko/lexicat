<script lang="ts">
    import { readable } from 'svelte/store';

	let { data } = $props();
</script>

<h1>Profile</h1>

<!-- Change what information is displayed based on login status -->
{#if data.user}
    <!-- User is logged in -->
    <span class="welcome-text">Hi, {data.user.username}! Nice to see you today.</span>

    <h3>Account Information</h3>
    <p>Username: {data.user.username}</p>
    <p>Email: {data.user.email}</p>
    <p>Date registered: {data.user.created}</p>
    
    <!-- The Logout button form -->
    <form method="POST" action="/logout">
        <button type="submit" class="button-default">Log Out</button>
    </form>
{/if}