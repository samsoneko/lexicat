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

The development environment is now running, and any changes inside the project files will be reflected immediately in the browser.

> [!NOTE]
> The database already comes with a preimported curriculum and vocabulary, as well as a demo user, to demonstrate the functional capabilities of the application. All of the content of the database, including the administrator login and the demo data setup inside `data/` can simply be deleted and replaced by a personalized curriculum, as explained in the section about [Content Creation](#content-creation).

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

This setup assumes that the content of pocketbase has already been created and imported into the database. To learn how this works, consult the section about [Content Creation](#content-creation).

With the folder structure set up, the project can be deployed by running:
1. `./pocketbase serve` (Same as in development)
2. `$env:ORIGIN="http://localhost:3000"; npm start` (Starting the node server with the correct environment variable)

## Content Creation

In its default state, the app contains a preimported curriculum and vocabulary, as well as a demo user, to demonstrate its functionality. This demo content is located inside of `data/`, including a file for seeding the database called `pocketbase_seeder.ts`.

Custom content can simply be created by following the simple structure of the demo files `lx_currisulum.json` and `lx_vocabulary.json` that display how the chapters, lessons and exercises as well as the vocabulary need to look like.