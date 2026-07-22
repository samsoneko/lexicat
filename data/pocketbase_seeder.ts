import PocketBase from 'pocketbase';
import fs from 'fs';

const pb = new PocketBase('http://127.0.0.1:8090');
// Authenticate as admin to bypass collection API rules
await pb.admins.authWithPassword('PH', 'PH');

const vocab = JSON.parse(fs.readFileSync('lx_vocab.json', 'utf-8'));
const curriculum = JSON.parse(fs.readFileSync('lx_curriculum.json', 'utf-8'));
const COURSE_ID = 'lx';

async function importData() {
	// Create course
	await pb.collection('courses').create({
		id: COURSE_ID,
		name: "lexin"
	});

	for (const word of vocab) {
		// Create word
		await pb.collection('vocabulary').create({
			word: word.word,
			language: COURSE_ID,
			translation: word.translation,
			info: word.info,
			part_of_speech: word.part_of_speech
		});
	}

	for (const chapter of curriculum) {
		// Create chapter
		const chapterRecord = await pb.collection('chapters').create({
			course: COURSE_ID,
			title: chapter.chapter_title,
			description: chapter.description,
			index: chapter.index
		});

		for (const lesson of chapter.lessons) {
			// Create lesson linked to chapter
			const lessonRecord = await pb.collection('lessons').create({
				chapter: chapterRecord.id,
				title: lesson.title,
				type: lesson.type,
				index: lesson.index
			});

			for (const ex of lesson.exercises) {
				// Create exercise linked to lesson
				await pb.collection('exercises').create({
					lesson: lessonRecord.id,
					type: ex.type,
					content: ex.content
				});
			}
		}
	}
	console.log('Vocab and curriculum imported successfully!');
}

importData();
