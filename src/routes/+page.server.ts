import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
    // Hardcoded ID for now
    const COURSE_ID = 'lx'; 

    try {
        // Fetch the course and expand its chapters and lessons
        const courseData = await locals.pb.collection('courses').getOne(COURSE_ID, {
            // Expand chapters and their lessons
            expand: 'chapters_via_course.lessons_via_chapter',
            // Sort chapters and lessons by their index
            sort: 'expand.chapters_via_course.index, expand.chapters_via_course.expand.lessons_via_chapter.index'
        });

        // Extract the nested data
        const chapters = courseData.expand?.['chapters_via_course'] || [];

        return {
            chapters: chapters.map((chapter: any) => ({
                id: chapter.id,
                title: chapter.title,
                index: chapter.index,
                // Extract lessons inside this specific chapter
                lessons: chapter.expand?.['lessons_via_chapter'] || []
            }))
        };

    } catch (err: any) {
        console.error('Failed to load curriculum:', err);
        throw error(500, 'Could not load your curriculum data.');
    }
};