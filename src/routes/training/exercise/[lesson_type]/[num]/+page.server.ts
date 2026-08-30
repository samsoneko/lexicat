import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
    // Authentication
    if (!locals.pb.authStore.isValid || !locals.pb.authStore.record) {
        throw error(401, 'Unauthorized request.');
    }
    
    const LESSON_TYPE = params.lesson_type;
    const NUMBER = Number(params.num);
    const userId = locals.pb.authStore.record.id;

    try {
        // Get all exercises of the specified type in random order
        const allExercises = await locals.pb.collection('exercises').getFullList({
            filter: `type = "${LESSON_TYPE}"`,
            sort: '@random'
        });

        // Get user lessons to check which exercises are already unlocked
        const userLessons = await locals.pb.collection('completed_lessons').getFullList({
            filter: `user = "${userId}"`,
            fields: 'lesson'
        });

        // Only include exercises that the user has already seen
        const userLessonIDs = userLessons.map(entry => entry.lesson);
        let viableExercises = allExercises.filter((ex) => userLessonIDs.includes(ex.lesson));

        // If necessary, shorten the exercises to the number specified
        if (viableExercises.length > NUMBER) {
            viableExercises = viableExercises.slice(0, NUMBER);
        }

        return {
            exercises: viableExercises.map((entry: any) => ({
                type: entry.type,
                content: entry.content
            }))
        };

    } catch (err: any) {
        console.error('Failed to load exercise data:', err);
        throw error(500, 'Could not start the training session.');
    }
};