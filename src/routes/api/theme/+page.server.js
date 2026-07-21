import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ locals, cookies, request }) => {
        const formData = await request.formData();
        const currentTheme = formData.get('theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        // Save to browser cookie for instant server hook access
        cookies.set('theme', newTheme, { path: '/', httpOnly: false, secure: false });

        // Save to PocketBase if the user is authenticated
        if (locals.user) {
            try {
                await locals.pb.collection('users').update(locals.user.id, {
                    theme: newTheme
                });
            } catch (err) {
                console.error("Failed to save theme to PocketBase", err);
            }
        }

        // Redirect back to the page they clicked it from
        const redirectTo = request.headers.get('referer') || '/';
        throw redirect(303, redirectTo);
    }
};
