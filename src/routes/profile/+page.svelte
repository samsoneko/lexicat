<script lang="ts">
    import { goto } from '$app/navigation';
	let { data } = $props();

    const humanReadableDate = $derived(new Date(Date.parse(data.user.created)).toDateString())
</script>

<h1>Profile</h1>
<hr class="page-spacer">
<!-- Change what information is displayed based on login status -->
{#if data.user}
    <!-- User is logged in -->

    <h3>Account Information</h3>
    <section class="centered-section">
        <div class="account-info-tile">
            <p class="account-info-type">Username:</p>
            <p class="account-info-value">{data.user.username}</p>
        </div>
        <div class="account-info-tile">
            <p class="account-info-type">Email:</p>
            <p class="account-info-value">{data.user.email}</p>
        </div>
        <div class="account-info-tile">
            <p class="account-info-type">Date registered:</p>
            <p class="account-info-value">{humanReadableDate}</p>
        </div>
    </section>

    <h3>Options</h3>
    <section class="options-section">
        <!-- Theme Toggle Form Submit -->
        <form method="POST" action="/api/theme" style="display: inline">
            <input type="hidden" name="theme" value={data.theme} />
            <button type="submit" class="default-button option-button">
                {data.theme === 'dark' ? 'Change to Light Mode ☀️' : 'Change to Dark Mode 🌙'}
            </button>
        </form>
        
        <button class="default-button option-button" onclick={() => goto("/course")}>Change my course <i class="fa-solid fa-code-compare"></i></button>
        
        <!-- The Logout button form -->
        <form method="POST" action="/logout">
            <button type="submit" class="default-button option-button">Log Out <i class="fa-solid fa-right-from-bracket"></i></button>
        </form>

        <form method="POST" action="?/deleteAccount">
            <button type="submit" class="default-button delete-button" onclick={(event) => {if(!confirm('Do you really want to delete your account?')) {event.preventDefault();}}}>Delete my account <i class="fa-solid fa-trash-can"></i></button>
        </form>
    </section>

{/if}

<style>
    .account-info-tile {
        width: 300px;
        background-color: var(--layer-1);
        padding: var(--padding-s);
        border: var(--border);
        box-shadow: var(--box-shadow);
        border-radius: var(--border-radius-s);
        display: flex;
        justify-content: space-between;
    }

    .account-info-type {
        margin: 0px;
        color: var(--subtext-color);
    }

    .account-info-value {
        margin: 0px;
    }

    .options-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .option-button {
        width: 200px;
    }

    .delete-button {
        width: 200px;
        border: 3px solid var(--red-light);
    }
</style>