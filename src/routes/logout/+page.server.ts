import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ locals }) => {
        // Clear the PocketBase auth store on the server
        locals.pb.authStore.clear();
        locals.user = null;

        // Redirect back to login.
        throw redirect(303, '/login');
    }
};