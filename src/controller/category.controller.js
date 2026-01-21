function createCategoryController({categoryService}){
    return{
        getCategory: async (req,res,next)=>{
            try{
                const data = await categoryService.getAll()
                res.status(200).json({
                    success: true,
                    message: "Get All Category Success",
                    category: data
                })
            } catch (error){
                next(error)
            }
        },

        getCategoryById: async (req, res, next)=>{
            try{
                const id = parseInt(req.params.id)
                const data = await categoryService.getById(id)
                res.status(200).json({
                    success: true,
                    message: "Get Category By Id Success",
                    category: data
                })
            } catch(error){
                next(error)
            }
        },

        createNewCategory: async(req, res, next)=>{
            try{
                const data = req.body
                const newData = await categoryService.create(data)
                res.status(200).json({
                    success: true,
                    message: "Create Category Success",
                    newCategory: newData
                })
            }catch(error){
                next(error)
            }
        },

        updateCategory: async(req, res, next)=>{
            try{
                const id = parseInt(req.params.id)
                const data = req.body
                const updatedData = await categoryService.update(id, data)
                res.status(200).json({
                    success: true,
                    message: "Updated Successfully",
                    updatedCategory: updatedData
                })
            } catch(error){
                next(error)
            }
        },

        deleteCategory: async(req, res, next)=>{
            try{
                const id = parseInt(req.params.id)
                const deletedData = await categoryService.getById(id)
                const deletedCategory = await categoryService.delete(id)
                res.status(200).json({
                    success: true,
                    message: "Deleted Successfully",
                    deletedCategory: deletedData
                })
            } catch(error){
                next(error)
            }
        }
    }
}

module.exports =createCategoryController