/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // add field
  collection.fields.addAt(10, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_562893559",
    "help": "",
    "hidden": false,
    "id": "relation379482041",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "course",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "help": "",
    "hidden": false,
    "id": "json3912345333",
    "maxSize": 0,
    "name": "preferences",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // remove field
  collection.fields.removeById("relation379482041")

  // remove field
  collection.fields.removeById("json3912345333")

  return app.save(collection)
})
