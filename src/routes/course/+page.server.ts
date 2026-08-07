import { fail, redirect, error } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, locals }) => {
        // Authentication
        if (!locals.pb.authStore.isValid || !locals.pb.authStore.record) {
            throw error(401, 'Unauthorized request.');
        }

        const data = await request.formData();
        const chosenCourse = data.get('course');

        if (!chosenCourse) {
            return fail(400, { message: 'Please select a course.' });
        }

        try {
            // Update the user record in PocketBase
            await locals.pb.collection('users').update(locals.pb.authStore.record.id, {
                course: chosenCourse
            });
        } catch (err) {
            return fail(500, { message: 'Failed to save course.' });
        }

        // Redirect to start now that onboarding is complete
        throw redirect(303, '/');
    }
};