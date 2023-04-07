const express = require("express")
const route = express.Router()
const productController = require("../controllers/product_controller")
const verifyToken = require("../middlewares/verify_token")
const uploadFiles = require("../middlewares/upload_files")
const clientVerify = require("../middlewares/verify-token-client")

route.post("/create", uploadFiles.array("photos"), verifyToken , productController.create) // verify token
route.get("/getAll", clientVerify, productController.getAll)
route.get("/getByID/:id", productController.getByID)
route.get("/getByQuery", productController.getByQuery)
route.put("/update/:id", productController.update)
route.delete("/delete/:id", productController.deleteProduct)
 
module.exports = route