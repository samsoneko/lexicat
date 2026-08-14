import PocketBase from 'pocketbase';
import fs from 'fs';

const pb = new PocketBase('http://127.0.0.1:8090');
// Authenticate as admin to bypass collection API rules
await pb.admins.authWithPassword('caesaranton700@yahoo.de', 'wawD2pwy');

const vocabulary = JSON.parse(fs.readFileSync('lx_vocabulary.json', 'utf-8'));
const curriculum = JSON.parse(fs.readFileSync('lx_curriculum.json', 'utf-8'));
const COURSE_ID = 'lx';

async function importData() {
	// Create course
	await pb.collection('courses').create({
		id: COURSE_ID,
		name: "lexin"
	});
	// Create second dummy course
	await pb.collection('courses').create({
		id: "sg",
		name: "sangot"
	});

	for (const vocab of vocabulary) {
		// Create word
		await pb.collection('vocabulary').create({
			slug: vocab.slug,
			word: vocab.word,
			course: COURSE_ID,
			translation: vocab.translation,
			info: vocab.info,
			part_of_speech: vocab.part_of_speech
		});
	}
	console.log('Vocab imported successfully!');

	// Get full list of vocabulary
	const vocabRecords = await pb.collection('vocabulary').getFullList({
		filter: `course = "${COURSE_ID}"`, // Only get vocab for the current curriculum
    	fields: 'id,slug', // Only request necessary columns
    });

    // Create map from slug to id
    const slugToIdMap = new Map<string, string>();
    vocabRecords.forEach(record => {
    	slugToIdMap.set(record.slug, record.id);
    });

	for (const chapter of curriculum) {
		// Create chapter
		const chapterRecord = await pb.collection('chapters').create({
			course: COURSE_ID,
			title: chapter.title,
			description: chapter.description,
			index: chapter.index
		});

		for (const lesson of chapter.lessons) {

			// Create word references for this lesson
			let wordIDs : String[] = []
			for (const word_slug of lesson.words) {
				const wordID = slugToIdMap.get(word_slug);
				if (wordID) {
					wordIDs.push(wordID);
				} else {
					console.warn(`Word with slug "${word_slug}" not found in vocabulary.`);
				}
			}

			// Create lesson linked to chapter
			const lessonRecord = await pb.collection('lessons').create({
				chapter: chapterRecord.id,
				title: lesson.title,
				type: lesson.type,
				index: lesson.index,
				words: wordIDs,
			});

			for (const exercise of lesson.exercises) {
				// Create exercise linked to lesson
				await pb.collection('exercises').create({
					lesson: lessonRecord.id,
					type: exercise.type,
					content: exercise.content,
					index: exercise.index
				});
			}
		}
	}
	console.log('Curriculum imported successfully!');
}

importData();
