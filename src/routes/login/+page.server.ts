import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const identity = formData.get('identity') as string;
        const password = formData.get('password') as string;

        if (!identity || !password) {
            return fail(400, { identity, error: 'Please enter both fields' });
        }

        try {
            // Authenticate with PocketBase
            await locals.pb.collection('users').authWithPassword(identity, password);
        } catch (err) {
            return fail(400, { identity, error: 'Invalid credentials' });
        }

        // Redirect after successful login
        throw redirect(303, '/');
    }
};