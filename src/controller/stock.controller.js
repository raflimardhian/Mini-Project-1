function createStockController({stockService}){
    return{
        getStock: async(req, res, next)=>{
            try{
                const data = await stockService.getAll()
                res.status(200).json({
                    success: true,
                    message: "Get All Stock History success",
                    stockHistory: data
                })
            } catch(error){
                next(error)
            }
        },

        getStockById: async(req, res, next)=>{
            try{
                const id = parseInt(req.params.id)
                const data = await stockService.getById(id)
                res.status(200).json({
                    success: true,
                    message: "Get Stock History By Id Success",
                    history: data
                })
            } catch(error){
                next(error)
            }
        },

        createNewStock: async(req, res, next)=>{
            try{
                const dataStock = {...req.body, userId: req.user.id}
                const newData = await stockService.create(dataStock)
                res.status(200).json({
                    success: true,
                    message: "Created Successfully",
                    history: newData
                })
            }catch(error){
                next(error)
            }
        },

        updateStock: async(req, res, next)=>{
            try{
                const id = parseInt(req.params.id)
                const data = req.body
                const updatedStock = await stockService.update(id, data)
                res.status(200).json({
                    success: true,
                    message: "Update Successfully",
                    history: updatedStock
                })
            } catch(error){
                next(error)
            }
        },

        deleteStock: async(req, res, next)=>{
            try{
                const id = parseInt(req.params.id)
                const deleted = await stockService.delete(id)
                res.status(200).json({
                    success: true,
                    message: "Deleted successfully",
                    data:deleted
                })
            } catch(err){
                next(err)
            }
        }

    }
}

module.exports= createStockController