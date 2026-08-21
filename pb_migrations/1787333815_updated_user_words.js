/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1829754180")

  // remove field
  collection.fields.removeById("date546735226")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1829754180")

  // add field
  collection.fields.addAt(6, new Field({
    "help": "",
    "hidden": false,
    "id": "date546735226",
    "max": "",
    "min": "",
    "name": "next_review",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
})
