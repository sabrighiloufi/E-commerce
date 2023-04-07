const express = require("express")
const app = express()
const morgan = require("morgan")
const dotenv = require("dotenv")

require("dotenv").config()

const cors = require("cors")

const database = require('./config/database')


app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

const productRoutes = require("./routes/product_routes")
app.use("/products" , productRoutes)

const subCategoryRoutes = require("./routes/subCategory_routes")
app.use("/subcategories", subCategoryRoutes)


const categoryRoutes = require("./routes/category_routes")
app.use("/categories", categoryRoutes)

app.get("/getImage/:img", (req, res)=>{
    res.sendFile(__dirname + "/storages/" + req.params.img)
})


const clientRoutes = require("./routes/client_routes")
app.use("/clients", clientRoutes)

const providerRoutes = require("./routes/provider_routes")
app.use("/providers", providerRoutes)

const adminRoutes = require("./routes/admin_routes")
app.use("/admins", adminRoutes)

const orderRoutes = require("./routes/order_routes")
app.use("/orders", orderRoutes)

const authRoutes = require("./routes/auth_routes")
app.use("/auth", authRoutes)

const PORT = process.env.PORT

app.listen(PORT, (err)=>{
    if(err){
        console.log("server not runned")
    }else{
        console.log(`server running successfully on http://localhost:${PORT}`)
    }
})
