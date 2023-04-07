
const subCategoryModel = require("../models/subCategory_model")

const categoryModel = require("../models/category_model")

module.exports = {

create : (req, res)=>{
    const subCategory = new subCategoryModel(req.body)
    subCategory.save(req.body, (err, item)=>{
        if(err){
            res.status(406).json({message: "sub-category not created"})
        }else{
            categoryModel.findByIdAndUpdate(req.body.category, 
            
                {$push: {subcategories: subCategory}}, ()=>{

                    res.status(201).json({message: "sub-category created successfully", data: item})
                }
                )
        }
    })
},


getAll :(req, res)=>{
    subCategoryModel.find({}).populate({path: "products"}).populate("category").exec((err, items)=>{
        if(err){
            res.status(406).json({message: "no sub-category found"})
        }else{
            res.status(201).json({message: "list of sub-categories", data: items})
        }

    })
},

getByID : (req, res)=>{
    subCategoryModel.findById(req.params.id, (err, item)=>{
        if(err){
            res.status(406).json({message: "no sub-category found"})
        }else{
            res.status(201).json({message: "sub-category founded", data: item})
        }
    })

},

getByQuery :async (req, res)=>{
    let {q} = req.query 
    let subcategories =await subCategoryModel.find({
        $or:[
            {name: {$regex: q, $options:"i"}}
        ]
    })
    res.status(201).json(subcategories)
},

update : (req, res)=>{
    subCategoryModel.findByIdAndUpdate(req.params.id, req.body, (err, item)=>{
        if(err){
            res.status(406).json({message: "sub-category not updated"})
        }else{
            res.status(201).json({message: "sub-category updated successfully", data: item})
        }
    })
},


DeleteSubCategory :async (req, res)=>{
    try {
        const subCategory =await subCategoryModel.findById({_id:req.params.id}) 
        await categoryModel.findByIdAndUpdate(subCategory.category, 
            {$pull: {subcategories: subCategory._id}}  
            )
        await subCategoryModel.deleteOne({_id:req.params.id}) 
        res.status(201).json({message: "sub-category deleted"}) 
    } catch (error) {
        res.status(406).json({message: "error to delete sub-category"})
    }
}

}
