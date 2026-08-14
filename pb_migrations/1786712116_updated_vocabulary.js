/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1848244715")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_562893559",
    "help": "",
    "hidden": false,
    "id": "relation3571151285",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "course",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1848244715")

  // update field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_562893559",
    "help": "",
    "hidden": false,
    "id": "relation3571151285",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "language",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
})
