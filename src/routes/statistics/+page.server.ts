import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    // Authentication
    if (!locals.pb.authStore.isValid || !locals.pb.authStore.record) {
        throw error(401, 'Unauthorized request.');
    }

    // Hardcoded ID for now
    const COURSE_ID = 'lx';
    const userId = locals.pb.authStore.record.id;

    // Update user statistics
    try {

        // Fetch total number of completed lessons
        const userHistory = await locals.pb.collection('completed_lessons').getFullList({
            filter: `user = "${userId}"`
        });

        return {
            statistics: userHistory.map((entry: any) => ({
                lesson: entry.lesson,
                score: entry.score,
                time: entry.created
            }))
        };
        
    } catch (err: any) {
        // User has not done any lessons yet
        console.error('Failed to load statistics:', err);
        throw error(500, 'Could not load your statistics.');
    }
};