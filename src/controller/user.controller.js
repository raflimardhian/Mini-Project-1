function createUserController({userService}){
    return{
        getUsers: async (req,res,next)=>{
            try{
                const data = await userService.getAllUsers()
                res.status(200).json({
                    success:true,
                    message: "Get All Data Success",
                    data:data
                })
            }catch(error){
                next(error)
            }
        },

        getById: async(req,res,next)=>{
            try{
                const id = parseInt(req.params.id)
                const data = await userService.getUserById(id)
                res.status(200).json({
                    success:true,
                    message:'Get Data By Id',
                    data: data
                })
            } catch(error){
                next(error)
            }
        },

        createNewUser: async (req,res,next)=>{
            try{
                const data = await userService.createUser(req.body)
                res.status(201).json({
                    success: true,
                    message: 'Success Create New User',
                    data: data
                })
            } catch(error){
                next(error)
            }
        },

        updateUser: async(req, res, next)=>{
            try{
                const id = parseInt(req.params.id)
                const data = req.body
                const updatedData =  await userService.updatedUser(id, data)
                res.status(200).json({
                    success:true,
                    message:'Update Success',
                    data: updatedData
                })
            } catch(error){
                next(error)
            }
        },

        deleteUser: async (req, res, next)=>{
            try{
                const id = parseInt(req.params.id)
                const data = await userService.deleteUser(id)
                res.status(200).json({
                    success:true,
                    message: 'Delete Success',
                    data: data
                })
            } catch(error){
                next(error)
            }
        }
    }
}


module.exports = createUserController