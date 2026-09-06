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