function createCategoryRepository({db}){
    return{
        async findAll(){
            return await db.category.findMany({
                include:{
                    products:{
                        where:{
                            deletedAt:null
                        }
                    }
                }
            })
        },

        async findById(id){
            return await db.category.findUnique({
                where:{
                    id:id
                }
            })
        },

        async create(data){
            return await db.category.create({
                data:{
                    name:data.name
                }
            })
        },

        async update(id, data){
            return await db.category.update({
                where:{
                    id:id
                },
                data:{
                    name:data.name
                }
            })
        },

        async delete(id){
            return await db.category.delete({
                where:{
                    id:id
                }
            })
        }
    }
}

module.exports =createCategoryRepository