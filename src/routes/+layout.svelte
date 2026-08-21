<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	let { data, children } = $props();
</script>

<svelte:head>
    <title>Lexica</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app-frame">
	<nav class="navbar">
        <button class="navbar-button" aria-label="Home">
            <a class="navbar-icon" href="/" aria-label="Home"><i class="fas fa-home"></i> Home</a>
		</button>
        <button class="navbar-button" aria-label="Training">
            <a class="navbar-icon" href="/training" aria-label="Training"><i class="fas fa-dumbbell"></i> Training</a>
		</button>
        <button class="navbar-button" aria-label="Progress">
            <a class="navbar-icon" href="/progress" aria-label="Progress"><i class="fas fa-chart-line"></i> Progress</a>
		</button>
        {#if data.user}
            <!-- User is logged in -->
            <button class="navbar-button" aria-label="Profile">
                <a class="navbar-icon" href="/profile" aria-label="Profile"><i class="fas fa-user"></i> Profile</a>
            </button>
        {:else}
            <!-- User is logged out -->
            <a href="/login">Log In</a>
        {/if}
    </nav>

    <div class="app-content">
        {@render children()}
    </div>
</div>

<style>
	@import '$lib/assets/style.css';
</style>