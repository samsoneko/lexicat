// src/hooks.server.js
import PocketBase from 'pocketbase';
import { redirect } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

// Run function on every request
export async function handle({ event, resolve }) {
    // Initialize PocketBase client
    const pbUrl = env.POCKETBASE_URL || 'http://127.0.0.1:8090' // Env variable or fallback for local dev
    event.locals.pb = new PocketBase(pbUrl);

    // Load the auth store from the request cookie
    const cookie = event.request.headers.get('cookie') || '';
    event.locals.pb.authStore.loadFromCookie(cookie);

    try {
        // Keep the auth session valid and get the latest user data
        if (event.locals.pb.authStore.isValid) {
            await event.locals.pb.collection('users').authRefresh();
            event.locals.user = event.locals.pb.authStore.model;
        } else {
            event.locals.user = null;
        }
    } catch (_) {
        // Clear auth store if token is invalid or expired
        event.locals.pb.authStore.clear();
        event.locals.user = null;
    }

    // Process the request
    const response = await resolve(event);

    // Export the latest auth cookie back to the browser
    response.headers.set(
        'set-cookie', 
        event.locals.pb.authStore.exportToCookie({ secure: false }) // set secure: true in production
    );

    return response;
}
