# lexica

A simple webapp for language learning, enabling administrators to set up custom courses and upload their own language curriculums. It includes functionality for a custom learning tree divided into chapters, lessons and different exercise types as well as vocabulary training via the SM2 algorithm and progress tracking. A simple, extendible account system is used to save progress and statistics.

Built using [SvelteKit](https://svelte.dev/docs/kit/introduction) and [PocketBase](https://pocketbase.io/).

## Development Setup

For both development and deployment of the SvelteKit part of the app, Node.js has to be installed. This app was build using Node.js v24.18.0, but a newer version should work as well.

As for PocketBase, the repository already includes two executables. "pocketbase.exe" for Windows and "pocketbase" for Linux. The irrelevant executable can simply be deleted from the cloned repository.

Before starting the development environment, the dependencies for pocketbase have to be installed using `npm install pocketbase`

After cloning the repository, the project can be started from inside its root directory by executing two commands in separate terminals:
1. `./pocketbase serve` (Starts the PocketBase database service)
2. `npm run dev` (Starts the SvelteKit development server on localhost:5173)

Starting PocketBase for the first time will open up a browser window prompting the user to set up the Administrator access, which the user can freely choose.

The development environment is now running, and any changes inside the project files will be reflected immediately in the browser.

> [!NOTE]
> The initial database will be empty, but the project already comes with a demo curriculum and vocabulary inside `data/` that can be used to demonstrate the functional capabilities of the application. To learn how this data can be imported, read the section about [Importing Content](#importing-content). Instead, all of the demo content can also be ignored and replaced by a personalized curriculum, as explained in the section about [Content Creation](#content-creation).

## Importing Content

By default, the database is empty after the initial setup, but is already configured to work with the data structure used in the project. Therefore, the demo content from `data/` can simply be uploaded to the database.

For this, the included file `pocketbase_seeder.ts` can be used. It is already configured to access the included demo files and upload their content to PocketBase. The only necessary modification is to update the admin credentials in line 6 to reflect the custom admin login chosen by the user. After that, execute the file using `node pocketbase_seeder.ts` inside of `data/` while PocketBase is running, and the curriculum and vocabulary should be imported successfully.

## Building

The SvelteKit part of the project can be build by executing `npm run build` inside of the root directory. Currently, the project uses `@sveltejs/adapter-node` for the build process. This may change depending on customizations.

The build command produces a `build/`-directory that contains the finalized SvelteKit files for deploying the project.

PocketBase does not need further steps for deployment, as it is simple enough to be run from a single executable.

After building, the build can be tested by running:
1. `./pocketbase serve` (Same as in development)
2. `npm run preview` (Uses the build files instead of the development directory)

However, this preview mode still happens within the development environment and does not guarantee a working deployment. To truly run the project independently, the [Deployment](#deployment) section should be consulted.

## Deployment

For deployment, the folder structure of the app looks as follows:
```
lexica/
    build/
    pb_data
    pb_migrations
    pocketbase
```

- `build/` is the folder produced by building the project using `npm run build`
- `pb_data` and `pb_migrations` are the two folders PocketBase uses for managing its content and state
- `pocketbase` is the executable for PocketBase, either the one for Linux or the one for Windows

This setup assumes that the content of pocketbase has already been imported into the database, so that it is located inside of `pb_data`. To learn how this works, consult the section about [Importing Content](#importing-content) and [Content Creation](#content-creation).

With the folder structure set up, the project can be deployed by running:
1. `./pocketbase serve` (Same as in development)
2. `$env:ORIGIN="http://localhost:3000"; node build` (Starting the node server with the correct environment variable)

## Content Creation

Custom content can simply be created by following the simple structure of the demo files `lx_currisulum.json` and `lx_vocabulary.json` that display how the chapters, lessons and exercises as well as the vocabulary need to look like.

After creating custom content, the file `pocketbase_seeder.ts` can be used to upload it to the database. For this, the lines marked with **CHANGE THIS FOR CUSTOM CURRICULUM** need to be modified to reflect the file paths and values of the custom curriculum.

Any custom curriculum needs to consist of two files: `XX_vocabulary.json` and `XX_curriculum.json`, where `XX` stands for a unique, two-letter language code for the language, which should match the variables in `pocketbase_seeder.ts`.

### Custom Curriculum

The base structure of any `XX_curriculum.json` should be as follows:

```json
[
    {
        "title": "CHAPTER TITLE",
        "description": "CHAPTER DESCRIPTION",
        "index": 1,
        "lessons": [
            {
                "title": "LESSON TITLE",
                "type": "LESSON TYPE",
                "index": 1,
                "words": ["LIST OF VOCAB SLUGS"],
                "exercises": [
                    {
                        "type": "EXERCISE TYPE",
                        "index": 1,
                        "content": "CONTENT PLACEHOLDER"
                    }
                ]
            }
        ]
    }
]
```

Chapter and Lesson titles as well as their description can be picked freely, and their index reflects the sorting applied when the curriculum is loaded in the webapp. As both chapters as well as their lessons are contained in respective lists, both can be extended by simply duplicating their base structure and modifying them.

The Lesson Type can not be set freely, but instead needs to match one of the following three options:
- ``vocab``
- ``grammar``
- `review`

The choice of this is relevant for displaying the correct icon in the lesson tree, but does not effect the functionality in any way. As the naming suggest, the three options are meant to represent what content a lesson has to offer. Choose ``vocab`` if it mainly introduces new vocabulary, ``grammar`` if it introduces new grammatic constructions, and ``review`` if it only repeats previously learned material.

The "words" of a lesson should contain a list of all words first introduced in this lesson, identified by their **word slug**. How exactly this works and how it connects to the `XX_vocabulary.json` will be explained in [Custom Vocabulary](#custom-vocabulary).

As for the exercises, a lesson can contain any number of exercises higher than 1 as a list under "exercises". There are 7 different types of exercises, out of which 2 are for introducing content and 5 are for active training. They are:

#### Info Exercise

The ``info`` exercise contains a short title and a text, and is meant to introduce and explain new content and concepts for the language. The text in the "text" field can be styled with html sytnax, for example <br> or <i></i>.

```json
{
    "type": "info",
    "index": 1,
    "content": {
        "title": "Title",
        "text": "Explanation."
    }
}
```

#### Vocab Exercise

The ``vocab`` exercise contains a list of new words identified by their **word slug**, which will be explained in the [Custom Vocabulary](#custom-vocabulary) section. It is functionally similar to the word list for the entire lesson and can be identical, but could also only contain a subset of the words of the entire lesson (with the rest being introduced in a second Vocab exercise).

```json
{
    "type": "vocab",
    "index": 1,
    "content": {
        "options": ["XX:wordslug1", "XX:wordslug2"]
    }
}
```

#### Multiple Choice Exercise

The ``multiple_choice`` exercise gives the user multiple options for a translation prompt, out of which one is correct. It is not based on **word slugs**, but rather on plain string comparisons, so it could also contain entire sentences as options and answers.

```json
{
    "type": "multiple_choice",
    "index": 1,
    "content": {
        "prompt": "translation1",
        "options": ["word1", "word2"],
        "answer": "word1"
    }
}
```

#### Pairs Exercise

The ``pairs`` exercise instructs the user to find pairs of words and their translation. The "options" contain the lists of base words and translations, while the "answer" contains lists of the words aligned with the translations. Again, this only happens on a string level, so any words and translations can be implemented.

```json
{
    "type": "pairs",
    "index": 1,
    "content": {
        "options": [["word1", "word2"], ["translation1", "translation2"]],
        "answer": [["word1", "translation1"], ["word2", "translation2"]]
    }
}
```

#### Translate Exercise

The ``translate`` exercise gives the user a translation prompt, which they have to freely translate by typing text in an input field. The user input is then compared with the correct answer.

```json
{
    "type": "translate",
    "index": 1,
    "content": {
        "prompt": "Sentence prompt",
        "answer": "Sentence translation"
    }
}
```

#### Arrange Exercise

The ``arrange`` exercise gives the user a target sentence and a fixed number of word blocks, which they need to arrange in the correct order. The user answer is then compared with the correct answer. For this, both the user answer as well as the correct solution are stripped of their spaces, so the word blocks could also be used to arrange morphemes or grammatical affixes. However, capitalization is not ignored, so letters being lowercase or uppercase make a difference.

```json
{
    "type": "arrange",
    "index": 1,
    "content": {
        "prompt": "Sentence prompt",
        "options": ["word1", "word2"],
        "answer": "word1 word2"
    }
}
```

#### Word Bank Exercise

The ``word_bank`` exercise is identical to the ``arrange`` exercise, with the only difference being that it support more word blocks than the user actually needs, making the exercise harder by obscuring the number of needed words.

```json
{
    "type": "word_bank",
    "index": 1,
    "content": {
        "prompt": "Sentence prompt",
        "options": ["word1", "word2", "word3"],
        "answer": "word1 word2"
    }
}
```

### Custom Vocabulary

The base structure of any `XX_vocabulary.json` should be as follows:

```json
[
{
	"slug": "XX:wordslug1",
	"word": "word1",
	"translation": "translation1",
	"info": "OPTIONAL INFO",
	"part_of_speech": "POS_TAG"
}
]
```

The vocabulary file is meant to serve as a dictionary for a language, containing all words (and, in a limited amount, expressions and affixes) of the respective curriculum. It is used as a lookup when introducing words in a lesson, and also as a base for the integrated SRS system of the app. For this, the `XX_vocabulary.json` file should follow a simple structure:
- ``"slug"`` is the identifier of the word and has to be unique for the entire curriculum of the language. It is used to "find" the word inside of the vocabulary list and retrieve its information. Theoretically, the slug can have any (unique) form, but it is a good practice to reflect their curriculum in it for easier distinction (e.g. ``XX:wordslug1``) or maybe even their use (e.g. ``XX:NOUN:wordslug1``).
- ``"word"`` contains the word in the target language
- ``"translation"`` contains the translation of the word in the curriculums base language (likely English)
- ``"info"`` can contain an explanatory text about the word, but is optional
- ``"part_of_speech"`` can be one of a few predefined options: ``noun``, ``verb``, ``adjective`` ``pronoun``, ``adverb`` or ``other``

As mentioned multiple times in the [Custom Curriculum](#custom-curriculum) section, the word list of a lesson as well as the content of a ``vocab`` exercise also needs to contain the respective words via their **slugs**.

### Final remarks on content creation

It is important to note that most of the restrictions above regarding the exercise content and the vocabulary referencing are either optional or at least don't break the application in a bad way. For example, choosing the wrong ``part_of_speech`` for a word does not matter at all other than making it appear with a wrong color and label. Likewise, including the wrong word slugs in a lesson or forgetting some of them does not break the lesson, but only leads to the wrong words being added to the SRS system. The translations and words inside of all exercises other than the ``vocab`` exercise do not even need to match their specification from `XX_vocabulary.json` exactly, as they are only based on strings and not compared against the dictionary. This has obvious advantages for the robustness of the app, but also means that the content creator should double check all of their custom content for correctness.

However, some rules absolutely need to be followed for the app to work properly. First, all word slugs need to be unique, and a lesson should not contain a slug that is not defined in the vocabulary. The fields ``part_of_speech`` as well as the ``type`` for a lesson and an exercise can only be one of the options mentioned, and the content structure of an exercise needs to match its chosen type.

This information is all that is needed to start with the creation of a custom language course. For inspiration and as a template, the included files `lx_currisulum.json` and `lx_vocabulary.json` can and of course should be used.