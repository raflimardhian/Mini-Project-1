const apiError = require("../utils/apiError");

function createStockService({stockRepo, productRepo}){
    return{
        async getAll(){
            return await stockRepo.findAll()
        },

        async getById(id){
            if (!id || isNaN(id)) {
                throw apiError(400, "BAD_REQUEST", "Invalid stock history id");
            }
            const data = await stockRepo.findById(id)
            if (!data) throw apiError(404, "NOT_FOUND", "Stock history not found");
            return data
        },

        async create(stock){
            const { productId, type, quantity, userId } = stock
            const product = await productRepo.findById(productId)
            if(!product){
                throw apiError(404, "NOT_FOUND", "Product not found")
            }
            if (!productId || !userId || !type) {
                throw apiError(400, "BAD_REQUEST", "Missing required fields");
            }
            if (!["IN", "OUT"].includes(type)) {
                throw apiError(400, "BAD_REQUEST", "Invalid stock type");
            }
            if (quantity <= 0) {
                throw apiError(400, "BAD_REQUEST", "Quantity must be greater than 0");
            }

            let newStock = product.stock

            if(type === "IN"){
                newStock += quantity
            }

            if(type === "OUT"){
                if(product.stock < quantity){
                    throw apiError(400, "BAD_REQUEST", "Stock not enough")
                }
                newStock -= quantity
            }

            await productRepo.updateStock(productId, newStock)

            await stockRepo.create({
                productId,
                userId,
                type,
                quantity
            })
            return {productId, stock:newStock}
        },

        async update(id, newData){
            const currentStock = await stockRepo.findById(id)
            if (!currentStock) throw apiError(404, "NOT_FOUND", "Stock history not found");
            return await stockRepo.update(id, newData)
        },

        async delete(id){
            const deteledStock = await stockRepo.delete(id)
            if (!deteledStock) throw apiError(404, "NOT_FOUND", "Stock history not found");
            return true
        }
    }
}

module.exports = createStockService