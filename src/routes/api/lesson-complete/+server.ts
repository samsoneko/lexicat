import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
    // Authentication
    if (!locals.pb.authStore.isValid || !locals.pb.authStore.record) {
        throw error(401, 'Unauthorized request.');
    }

    const COURSE_ID = locals.pb.authStore.record.course; // Not even necessary because all words over all courses are unique
    const userId = locals.pb.authStore.record.id;
    const { lessonId, words, score } = await request.json();

    if (!lessonId || score === undefined) {
        throw error(400, 'Missing required parameters.');
    }

    try {
        // Get the words from the current lesson
        const lesson = await locals.pb.collection('lessons').getOne(lessonId, {
            fields: 'words',
        });

        const lessonWordIds: string[] = lesson.words || [];
        if (lessonWordIds.length === 0) {
            console.log("This lesson does not contain words to add");
            return;
        }

        // Build query string to retrieve all already existing user words for the lesson
        const idFilterString = lessonWordIds.map(id => `word = "${id}"`).join(' || ');
        const fullFilter = `user = "${userId}" && (${idFilterString})`;

        // Retrieve user words and check which new words are missing
        const existingUserWords = await locals.pb.collection('user_words').getFullList({
            filter: fullFilter,
            fields: 'word', // Only linked vocabulary is necessary
        });
        const existingWordIdsSet = new Set(existingUserWords.map(uw => uw.word));
        const missingWordIds = lessonWordIds.filter(id => !existingWordIdsSet.has(id));

        if (missingWordIds.length === 0) {
            console.log("All lesson words are already present in the user words");
            return;
        }

        // Add all new words to the user words
        for (const wordId of missingWordIds) {
            await locals.pb.collection('user_words').create({
                user: userId,
                word: wordId,
                interval: 0,
                ease_factor: 2.5,
                repetitions: 0,
                next_review: new Date()
            });
        }

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
