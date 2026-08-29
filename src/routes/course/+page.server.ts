import { fail, redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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

export const load: PageServerLoad = async ({ params, locals }) => {
    // Authentication
    if (!locals.pb.authStore.isValid || !locals.pb.authStore.record) {
        throw error(401, 'Unauthorized request.');
    }

    try {
        // Fetch all vocab data for the course to serve as a dictionary during the exercises
        const courseData = await locals.pb.collection('courses').getFullList();

        const courses = courseData.map((ex: any) => ({
            id: ex.id,
            name: ex.name
        }));

        return {
            courses
        };

    } catch (err: any) {
        console.error('Failed to load session data:', err);
        throw error(500, 'Could not start the training session.');
    }
};