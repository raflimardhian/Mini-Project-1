function createUserRepository({db}){
    return{
        async getAll(skip, take){
            {skip, take}
            return await db.user.findMany({
                skip:skip,
                take: take
            })
        },

        async getUsername(username){
            const user = await db.user.findUnique({
                where:{
                    username: username
                }
            })
            return user
        },

        async getById(id){
            const user = await db.user.findUnique({
                where: {
                    id:id
                },
                include:{
                    stocks:true
                }
            })
            return user
        },

        async create(user){
            const newData = await db.user.create({
                data:{
                    username: user.username,
                    password: user.password
                }
            })
            return newData
        },

        async update(id, data){
            const updatedUser= await db.user.update({
                where:{
                    id: id
                },
                data:{
                    username:data.username
                }
            })
            return updatedUser
        },

        async delete(id){
            const deletedUser = await db.user.delete({
                where:{
                    id: id
                }
            })
            return deletedUser
        }
    }
}

module.exports = createUserRepository