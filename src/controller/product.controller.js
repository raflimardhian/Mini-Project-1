function createProductController({productService}){
    return{
        getProduct: async(req, res, next)=>{
            try{
                const { name, endDate, startDate}=req.query
                const productId = parseInt(req.query.productId)
                const page = parseInt(req.query.page) 
                const limit = parseInt(req.query.limit) 
                const data = await productService.getAll({page, limit, productId, name, endDate, startDate})
                res.status(200).json({
                    success: true,
                    message: "Get All Product Success",
                    product: data
                })
            } catch(error){
                next(error)
            }
        },

        getProductById: async(req, res, next)=>{
            try{
                const id = parseInt(req.params.id)
                const data = await productService.getById(id)
                res.status(200).json({
                    success: true,
                    message: "Get Product By Id Success",
                    product: data
                })
            } catch(error){
                next(error)
            }
        },

        createNewProduct: async(req, res, next)=>{
            try{
                const { name, stock, categoryId } = req.body

                if (!categoryId) {
                    return res.status(400).json({
                        success: false,
                        message: "categoryId is required"
                    })
                }

                const data = await productService.create({
                    name,
                    stock,
                    categoryId: Number(categoryId)
                })

                res.status(201).json({
                    success: true,
                    message: "Created Product Successfully",
                    newProduct: data
                })
            }catch(error){
                next(error)
            }
            
        },

        updateProduct: async(req, res, next)=>{
            try{
                const id = parseInt(req.params.id)
                const data = req.body
                const updatedData = await productService.update(id, data)
                res.status(200).json({
                    success:true,
                    message:"Updated Successfully",
                    updatedProduc: updatedData            
                })
            } catch(error){
                next(error)
            }
            
        },

        deleteProduct: async (req, res, next)=>{
            const id = parseInt(req.params.id)
            const data = await productService.delete(id)
            res.status(200).json({
                success: true,
                message: "Delete Success",
                data: data
            })
        }
    }
}

module.exports = createProductController