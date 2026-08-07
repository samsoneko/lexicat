import { fail, redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        // Simple validation
        if (!username || !email || !password) {
            return fail(400, { username, email, error: 'All fields are required' });
        }

        try {
            // Create the user in PocketBase
            await locals.pb.collection('users').create({
                username,
                email,
                password,
                passwordConfirm: password // PocketBase requires this configuration
            });

            // Automatically log them in after creating the account
            await locals.pb.collection('users').authWithPassword(email, password);
        } catch (err) {
            // Log the complete error object to the terminal for debugging
            console.error("PocketBase Error Details:", err.data);

            // Extract PocketBases specific error message, fallback if unavailable
            const serverMessage = err?.data?.message || 'Registration failed.';
            
            return fail(400, { 
                username, 
                email, 
                error: serverMessage 
            });
        }

        // Redirect to the course selection after registration
        throw redirect(303, '/course');
    }
};