import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    // Authentication
    if (!locals.pb.authStore.isValid || !locals.pb.authStore.record) {
        throw error(401, 'Unauthorized request.');
    }

    const COURSE_ID = locals.pb.authStore.record.course;
    const userId = locals.pb.authStore.record.id;

    // Retrieve user words from backend
    try {
        // Fetch all user words for the current user and course
        const userWords = await locals.pb.collection('user_words').getFullList({
            filter: `user = "${userId}" && word.course = "${COURSE_ID}"`
        });

        const vocabData = await locals.pb.collection('vocabulary').getFullList({
            filter: `course = "${COURSE_ID}"`
        });

        const totalCourseVocabulary = vocabData.length;

        return {
            wordMap: userWords.map((entry: any) => ({
                interval: entry.interval,
                updated: entry.updated
            })),
            totalCourseVocabulary
        };
        
    } catch (err: any) {
        // User has no user words yet
        console.error('Failed to load user words:', err);
        throw error(500, 'Could not load your user words.');
    }
};