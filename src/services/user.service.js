const apiError = require("../utils/apiError")

function createUserService({userRepo}){
    return{
        async getAllUsers(){
            const users = await userRepo.getAll()
            return users
        },
        async getUserById(id){
            const user = await userRepo.getById(id)
            return user
        },
        async createUser(data){
            const userData = {...data}
            return await userRepo.create(userData)
        },
        async deleteUser(id){
            const deletedUser = userRepo.findById(id)
            if(!deletedUser) throw apiError(404, "NOT_FOUND", "Delete failed, user not found")
            return await userRepo.delete(id)
        },
        async updatedUser(id, newData){
            // const updatedUser = userRepo.update(id)
            const currentUser = await userRepo.findById(id);
            if (!currentUser) throw apiError(404, "NOT_FOUND", "User not found");
            return await userRepo.update(id, newData)
        }
    }
}

module.exports = createUserService