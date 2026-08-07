import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    // Authentication
    if (!locals.pb.authStore.isValid || !locals.pb.authStore.record) {
        throw error(401, 'Unauthorized request.');
    }

    const COURSE_ID = locals.pb.authStore.record.course;
    const userId = locals.pb.authStore.record.id;

    // Update user statistics
    try {

        // Fetch total number of completed lessons for the current course
        const userHistory = await locals.pb.collection('completed_lessons').getFullList({
            filter: `user = "${userId}" && lesson.chapter.course = "${COURSE_ID}"`
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