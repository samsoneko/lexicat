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

        // Fetch all user words for the current user and course
        const userWords = await locals.pb.collection('user_words').getFullList({
            filter: `user = "${userId}" && word.course = "${COURSE_ID}"`
        });

        const vocabData = await locals.pb.collection('vocabulary').getFullList({
            filter: `course = "${COURSE_ID}"`
        });

        const lessonData = await locals.pb.collection('lessons').getFullList({
            filter: `chapter.course = "${COURSE_ID}"`
        });

        const totalUserVocabulary = userWords.length;
        const totalCourseVocabulary = vocabData.length;
        const totalCourseLessons = lessonData.length;

        return {
            progress: userHistory.map((entry: any) => ({
                lesson: entry.lesson,
                score: entry.score,
                time: entry.created,
                type: entry.type
            })),
            totalUserVocabulary,
            totalCourseVocabulary,
            totalCourseLessons
        };
        
    } catch (err: any) {
        // User has not done any lessons yet
        console.error('Failed to load statistics:', err);
        throw error(500, 'Could not load your statistics.');
    }
};