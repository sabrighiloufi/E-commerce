const express = require("express")

const route = express.Router()

const subCategoryController = require("../controllers/subCategory_controller")

route.post("/create", subCategoryController.create)
route.get("/getAll", subCategoryController.getAll)
route.get("/getByID/:id", subCategoryController.getByID)
route.get("/getByQuery", subCategoryController.getByQuery)
route.put("/update/:id", subCategoryController.update)
route.delete("/delete/:id", subCategoryController.DeleteSubCategory)


module.exports = route