import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    // Authentication
    if (!locals.pb.authStore.isValid || !locals.pb.authStore.record) {
        throw error(401, 'Unauthorized request.');
    }

    const COURSE_ID = locals.pb.authStore.record.course;
    const userId = locals.pb.authStore.record.id;

    try {
        // Fetch all vocab data for the user words already unlocked
        const userWords = await locals.pb.collection('user_words').getFullList({
            filter: `user = "${userId}" && word.course = "${COURSE_ID}"`,
            expand: 'word'
        });

        const vocabulary = userWords.map((entry: any) => ({
            slug: entry.expand.word.slug,
            word: entry.expand.word.word,
            translation: entry.expand.word.translation,
            info: entry.expand.word.info,
            pos: entry.expand.word.part_of_speech
        }));

        return {
            vocabulary
        };
        
    } catch (err: any) {
        // User has no user words yet
        console.error('Failed to load user words:', err);
        throw error(500, 'Could not load your user words.');
    }
};