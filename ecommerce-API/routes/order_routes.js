const express = require("express")

const route = express.Router()

const orderController = require("../controllers/order_controller")

const verifyToken = require("../middlewares/verify_token")

route.post("/create", verifyToken, orderController.create)
route.get("/getAll", orderController.getAll)
route.get("/getByID/:id", orderController.getByID)
route.get("/getByQuery", orderController.getByQuery)
route.put("/update/:id", orderController.update)
route.delete("/delete/:id", orderController.deleteOrder)
route.get("/getSalesStats", orderController.getSalesStats)

module.exports = route