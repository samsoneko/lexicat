import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
    // Authentication
    if (!locals.pb.authStore.isValid || !locals.pb.authStore.record) {
        throw error(401, 'Unauthorized request.');
    }

    const userId = locals.pb.authStore.record.id;
    const { lessonId, score } = await request.json();

    if (!lessonId || score === undefined) {
        throw error(400, 'Missing required parameters.');
    }

    try {

        // Placeholder for merging the new vocab into the existing one, not currently implemented
        // const existingWords = stats.learned_words || [];
        // const updatedWordsList = Array.from(new Set([...existingWords, ...vocabularyIds]));

        // Create record in completed_lessons collection
        // Timestamp of creation automatically serves as timestamp of lesson completion
        await locals.pb.collection('completed_lessons').create({
            user: userId,
            lesson: lessonId,
            score: score
        });

        return json({ success: true, message: 'Progress saved successfully.' });

    } catch (err: any) {
        console.error('Database progress transaction error:', err);
        throw error(500, 'Internal server error processing progression logs.');
    }
};
