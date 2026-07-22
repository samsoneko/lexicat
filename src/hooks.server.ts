// src/hooks.server.js
import PocketBase from 'pocketbase';
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

    // Determine the active theme (User profile choice -> or standalone cookie -> fallback to dark)
    const cookieTheme = event.cookies.get('theme');
    const userTheme = event.locals.user?.theme;
    event.locals.theme = userTheme || cookieTheme || 'dark';

    const themeClassName = `${event.locals.theme}-theme`;

    // Inject the theme class directly into the <html> tag
    const response = await resolve(event, {
        transformPageChunk: ({ html }) => html.replace('%theme%', themeClassName)
    });

    response.headers.append(
        'set-cookie', 
        event.locals.pb.authStore.exportToCookie({ secure: false })
    );

    return response;
}
