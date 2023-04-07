const orderModel = require("../models/order_model")

const clientModel = require("../models/client_model")

const create = (req, res)=>{
    const order = new orderModel(req.body)
    order.save(req.body, (err, item)=>{
        if(err){
            res.status(406).json({message: "order not created" + err})
        }else{
            clientModel.findByIdAndUpdate(order.client, 
                {$push: {orders: order}}, ()=>{
                    res.status(201).json({message: "order created successfully", data:item})
                }     
            )
        }

    })
}

const getAll = (req, res)=>{
    orderModel.find({}, (err, items)=>{
        if(err){
            res.status(406).json({message: "no order found"})
        }else{
            res.status(201).json({message: "list of order", data: items})
        }
    })

}

const getByID = (req, res)=>{
    orderModel.findById(req.params.id, (err, item)=>{
        if(err){
            res.status(406).json({message: "no order found"})
        }else{
            res.status(201).json({message: "order founded", data: item})
        }
    })
}

const getByQuery =async (req, res)=>{
    let {q}= req.query 
    let orders =await orderModel.find({
        $or:[
            {ref: {$regex: q, $options:"i"}}
        ]
    })
    res.status(201).json(orders)
}

const update = (req, res)=>{
    orderModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, item)=>{
        if(err){
            res.status(406).json({message: "order not updated"})
        }else{
            res.status(201).json({message: "order updated", data:item})
        }
    })
}

const deleteOrder =async (req, res)=>{
    try{
        const order =await orderModel.findById(req.params.id)
        await clientModel.findByIdAndUpdate(order.client, 
            {$pull:{orders: order._id}})
        await orderModel.deleteOne(order._id)
        res.status(201).json({message: "order deleted"})
    }catch(error){
        res.status(406).json(error)
    }
   
}

const getSalesStats = async (req, res)=>{
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    try {
       const data = await orderModel.aggregate([
        {$match: {createdAt: {$gte: lastYear}}},
        {$project: {month: {$month: "$createdAt"}, sales: "$priceTotal"}},
        {$group: {_id: "$month", total: {$sum: "$sales"}}}
       ])
       const newData = data.sort((a, b) => a._id < b._id ? -1 : 1)
       res.status(200).json(newData)
    } catch (error) {
        res.status(406).json(error)
    }
    
}

module.exports = {create, getAll, getByID, getByQuery, update, deleteOrder, getSalesStats}