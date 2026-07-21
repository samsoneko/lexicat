/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "learner[a-z0-9]{15}",
    "help": "",
    "hidden": false,
    "id": "text4166911607",
    "max": 30,
    "min": 0,
    "name": "username",
    "pattern": "^[a-zA-Z0-9]+$",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("_pb_users_auth_")

  // update field
  collection.fields.addAt(8, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text4166911607",
    "max": 30,
    "min": 0,
    "name": "username",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
