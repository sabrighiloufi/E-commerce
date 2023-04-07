
const productModel = require("../models/product_model")

const subCategoryModel = require("../models/subCategory_model")


const create =async (req, res, next)=>{
    if(req.files){
    req.body["images"] = req.files.length <= 0 ? [] : req.files.map(function(file){
        return {name: file.filename, description: "add product"}
    })
    }


    const product = new productModel(req.body)
    const refproduct =await productModel.findOne({refproduct:req.body.refproduct})
    if(refproduct){
        res.status(404).json({message : "product already exist"})
    }else{
        product.save(req.body, (err, item)=>{
            if(err){
                res.status(406).json({message : "product not created"+err})
            }else{
                 subCategoryModel.findByIdAndUpdate(req.body.subcategory,
                    {$push: {products: product}}, ()=>{

                        res.status(201).json({message: "product created successfully", data: item})
                    }  
                    )
            }
        })

    }
          
}

const getAll = (req, res)=>{
     productModel.find({}).populate({path: "subcategory", 
    populate:{path: "products"}, populate:"category"}).exec((err, items)=>{
        if(err){
            res.status(406).json({message : "no product found"})
        }else{
            res.status(201).json({message : "list of products ", data: items})
        }
    })

}

const getByID = (req, res)=>{
   productModel.findById(req.params.id, (err, item)=>{
        if(err){
            res.status(406).json({message : "no product found"})
        }else{
            res.status(201).json({message : "product founded", data: item})
        }
    })

}

const getByQuery =async (req, res)=>{
    let {q} = req.query 
    let products =await productModel.find({
        $or:[
            {refproduct: {$regex:q, $options:"i"}}
        ]
    })
    res.status(201).json(products)

}

const update = (req, res)=>{
    productModel.findByIdAndUpdate(req.params.id, req.body, {new:true} ,(err, item)=>{
        if(err){
            res.status(406).json({message : "no product updated"})
        }else{
            res.status(201).json({message : " product updated successfully", data:item})
        }
    })
}

const deleteProduct =async (req, res)=>{
    try {
        const product =await productModel.findById({_id:req.params.id})
        await subCategoryModel.findByIdAndUpdate(product.subcategory, 
            {$pull: {products: product._id}})
        await productModel.deleteOne({_id: req.params.id})
        res.status(201).json({message : "product deleted successfully"})
    
    } catch (error) {  
        res.status(406).json({message : " product not deleted"+error}) 
    }
       
}

module.exports = {create, getAll, getByID, getByQuery, update, deleteProduct}