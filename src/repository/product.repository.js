function createProductRepository({db}){
    return{
        async findAll(query){
            const {page, limit, productId, name, endDate, startDate} = query;
            return await db.product.findMany({
                ...(page && {skip:(page - 1) * limit}),
                ...(limit && {take:limit}),
                where:{
                    ...(productId && {id:productId}),
                    ...(name && {name:{
                        contains:name   
                    }}),
                    ...(startDate && endDate && {createdAt:{
                        gte: new Date(`${startDate}T00:00:00.000Z`),
                        lte: new Date(`${endDate}T23:59:59.999Z`)
                    }}),
                    deletedAt:null,
                    orderBy:{
                        createdAt:'desc'
                    }
                }
            })
        },

        async findById(id){
            return await db.product.findUnique({
                where:{
                    id:id
                },
                include:{
                    category:{
                        select:{
                            name:true
                        }
                    },
                    stocks:true
                }
            })
        },

        async create(product){
            return await db.product.create({
                data:{
                    name: product.name,
                    // category: {
                    //     connect:{
                    //         id:product.categoryId
                    //     }
                    // }
                    categoryId: product.categoryId
                }
            })
        },

        async updateStock(id, stock){
            return await db.product.update({
                where:{
                    id:id
                },
                data:{
                    stock:stock
                }
            })
        },

        async update(id, data){
            return await db.product.update({
                where:{
                    id
                },
                data:{
                    name:data.name,
                    categoryId: data.categoryId
                }
            })
        },

        async delete(id){
            return await db.product.update({
                where:{
                    id:id
                },
                data:{
                    deletedAt: new Date()
                }
            })
        }
    }
}

module.exports = createProductRepository