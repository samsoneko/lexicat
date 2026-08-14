import type { PageServerLoad } from '../../$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
    const LESSON_TYPE = params.lesson_type;
    const NUMBER = params.num;

    try {
        const viableExercises = await locals.pb.collection('exercises').getList(1, NUMBER, {
            filter: `type = "${LESSON_TYPE}"`,
            sort: '@random'
        });

        return {
            exercises: viableExercises.items.map((entry: any) => ({
                type: entry.type,
                content: entry.content
            }))
        };

    } catch (err: any) {
        console.error('Failed to load exercise data:', err);
        throw error(500, 'Could not start the training session.');
    }
};