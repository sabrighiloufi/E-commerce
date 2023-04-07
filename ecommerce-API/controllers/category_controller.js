const categoryModel = require("../models/category_model")

const create = (req, res)=>{
    const category = new categoryModel(req.body)
    category.save(req.body, (err, item)=>{
        if(err){
            res.status(406).json({message: "error to create new category"})
        }else{
            res.status(201).json({message: "new categroy created successfully", data: item})
        }
    })

}

const getAll = (req, res)=>{
    categoryModel.find({}, (err, items)=>{
        if(err){
            res.status(406).json({message: "no category found"})
        }else{
            res.status(201).json({message: "list of categories", data: items})
        }
    })
}

const getByID = (req, res)=>{
    categoryModel.findById(req.params.id, (err, item)=>{
        if(err){
            res.status(406).json({message: "no category found"})
        }else{
            res.status(201).json({message: "categroy founded successfully", data: item})
        }
    })
}

const getByQuery =async (req, res)=>{
    let {q} = req.query 
    let categories =await categoryModel.find({
        $or:[
            {name: {$regex: q, $options: "i"}}
        ]
    })
    res.status(201).json(categories)
}
 
const update = (req, res)=>{
    categoryModel.findByIdAndUpdate(req.params.id, req.body, (err, item)=>{
        if(err){
            res.status(406).json({message: "category not updated"})
        }else{
            res.status(201).json({message: "category updated", data: item})
        }
    })
}

const deleteCategory = (req, res)=>{
    categoryModel.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            res.status(406).json({message: "category not deleted"})
        }else{
            res.status(201).json({message: "category deleted"})
        }
    })
}

module.exports = {create, getAll, getByID, getByQuery, update, deleteCategory}