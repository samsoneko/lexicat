import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
    const LESSON_ID = params.id;

    try {
        // Fetch the lesson and expand its exercises
        const lessonData = await locals.pb.collection('lessons').getOne(LESSON_ID, {
            // Expand exercises
            expand: 'exercises_via_lesson',
            // Sort exercises by their index
            sort: 'expand.exercises_via_lesson.index'
        });
        // Extract and format the exercise records
        const rawExercises = lessonData.expand?.['exercises_via_lesson'] || [];
        
        // If the lesson is empty, throw error
        if (rawExercises.length === 0) {
            throw error(404, 'This lesson has no exercises content.');
        }

        // (Optional, currently disabled) shuffle exercises for gamification
        //const exercises = rawExercises.sort(() => Math.random() - 0.5).map((ex: any) => ({
        const exercises = rawExercises.map((ex: any) => ({
            id: ex.id,
            type: ex.type,
            content: ex.content,
            index: ex.index
        }));

        return {
            lessonTitle: lessonData.title,
            lessonId: lessonData.id,
            exercises
        };

    } catch (err: any) {
        console.error('Failed to load session data:', err);
        throw error(500, 'Could not start the training session.');
    }
};