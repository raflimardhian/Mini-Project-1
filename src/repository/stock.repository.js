function createStockRepository({db}){
    return{
        async findAll(){
            return await db.stockHistory.findMany({
                where:{}
            })
        },

        async findById(id){
            return await db.stockHistory.findUnique({
                where:{
                    id:id
                }
            })
        },
        async create(stock){
            return await db.stockHistory.create({
                data:{
                    productId: stock.productId,
                    userId: stock.userId,
                    quantity: stock.quantity,
                    type: stock.type,
                }
            })
        },
        async update(id){
            return await db.stockHistory.update({
                where:{
                    id:id
                },
                data:{
                    
                }
            })
        },
        async delete(id){
            return await db.stockHistory.delete({
                where:{
                    id:id
                }
            })
        }
    }
}

module.exports = createStockRepository