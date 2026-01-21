const apiError = require("../utils/apiError")

function createCategoryService({categoryRepo}){
    return{
        async getAll(){
            return await categoryRepo.findAll()
        },

        async getById(id){
            const data = await categoryRepo.findById(id)
            if(!id) throw apiError(404, "NOT_FOUND", "Category not found")
            return data
        },

        async create(category){
            const data = {...category}
            return await categoryRepo.create(data)
        },

        async update(id, data, userId){
            const currentCategory = await categoryRepo.findById(id)
            if (!currentCategory) throw apiError(404, "NOT_FOUND", "Category not found");
            return await categoryRepo.update(id, data)
        },

        async delete(id){
            const deletedCategory = await categoryRepo.delete(id)
            if(!deletedCategory) throw apiError(404, "NOT_FOUND", "Delete failed, category not found")

            return deletedCategory
        }
    }
}

module.exports = createCategoryService