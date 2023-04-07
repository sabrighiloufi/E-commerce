const express = require("express")

const route = express.Router()

const providerController = require("../controllers/provider_controller")

const upload = require("../middlewares/upload_files")

route.post("/create", upload.single("photo"), providerController.create)
route.get("/getAll", providerController.getAll)
route.get("/getByID/:id", providerController.getByID)
route.get("/getByQuery", providerController.getByQuery)
route.put("/update/:id", upload.single("photo"), providerController.update)
route.delete("/delete/:id", providerController.deleteProvider)
route.delete("/deleteAll", providerController.deleteAll)

module.exports = route