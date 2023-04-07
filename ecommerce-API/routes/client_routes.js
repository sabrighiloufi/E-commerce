const express = require("express")

const route = express.Router()

const clientController = require("../controllers/client_controller")

const uploadFile = require("../middlewares/upload_files")

route.post("/create", uploadFile.single("photo") ,clientController.create)
route.get("/getAll", clientController.getAll)
route.get("/getByID/:id", clientController.getByID)
route.get("/getByQuery", clientController.getByQuery)
route.put("/update/:id", uploadFile.single("photo") , clientController.update)
route.delete("/delete/:id", clientController.deleteClient)
route.delete("/deleteAll", clientController.deleteAll)
route.get("/getStats", clientController.getStats)
module.exports = route