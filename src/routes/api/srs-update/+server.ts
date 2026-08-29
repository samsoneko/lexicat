import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
    // Authentication
    if (!locals.pb.authStore.isValid || !locals.pb.authStore.record) {
        throw error(401, 'Unauthorized request.');
    }

    const { userWordId, answer } = await request.json();

    if (!userWordId || answer === undefined) {
        throw error(400, 'Missing required parameters.');
    }

    try {
        // Get the user word associated with the id
        const userWord = await locals.pb.collection('user_words').getOne(userWordId, {
            fields: 'interval, ease_factor, repetitions',
        });

        // Simple implementation of the SM-2 algorithm
        let repetitions = userWord.repetitions;
        let ease_factor = userWord.ease_factor;
        let interval = userWord.interval;
        if (answer >= 3) {
            if (repetitions === 0) {
                interval = 1;
            } else if (repetitions === 1) {
                interval = 6;
            } else {
                interval = Math.round(interval*ease_factor)
            }
            repetitions += 1;
        } else {
            repetitions = 0;
            interval = 1;
        }

        ease_factor = ease_factor + (0.1 - (5 - answer) * (0.08 + (5 - answer) * 0.02))
        
        if (ease_factor <= 1.3) {
            ease_factor = 1.3
        }

        // Update the user word stats
        await locals.pb.collection('user_words').update(userWordId, {
            repetitions: repetitions,
            ease_factor: ease_factor,
            interval: interval
        });

        return json({ success: true, message: 'User word updated successfully.' });

    } catch (err: any) {
        console.error('Database user word transaction error:', err);
        throw error(500, 'Internal server error processing user word update logs.');
    }
};
