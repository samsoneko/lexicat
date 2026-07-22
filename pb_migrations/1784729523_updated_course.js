/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_562893559")

  // update collection data
  unmarshal({
    "name": "courses"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_562893559")

  // update collection data
  unmarshal({
    "name": "course"
  }, collection)

  return app.save(collection)
})
