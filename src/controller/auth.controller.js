function createAuthController({authService}){
    return{
        register: async (req, res, next)=>{
            try {
                const newUser = await authService.register(req.body)
                res.status(201).json({
                    succes:true,
                    message: 'Register Successfully',
                    data: newUser
                })
            } catch(error){
                next(error)
                res.status(400),json({
                    success: false,
                    message: error.message
                })
            }
        },
        login:async (req, res, next)=>{
            try {
            const {username, password} = req.body
            const result = await authService.login(username, password)
            res.status(200).json({
                succes:true,
                data:result
            })
            } catch(error){
                next(error)
            }
        }
    }
}

module.exports = createAuthController