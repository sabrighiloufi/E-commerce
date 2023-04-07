const express = require("express")

const route = express.Router()

const categoryController = require("../controllers/category_controller")

route.post("/create", categoryController.create)
route.get("/getAll", categoryController.getAll)
route.get("/getByID/:id", categoryController.getByID)
route.get("/getByQuery", categoryController.getByQuery)
route.put("/update/:id", categoryController.update)
route.delete("/delete/:id", categoryController.deleteCategory)



module.exports = route