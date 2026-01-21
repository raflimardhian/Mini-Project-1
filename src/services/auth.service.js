const apiError = require('../utils/apiError')
function createAuthService({userRepo, security}){
    return{
        async register(userData){
            const existingUser = await userRepo.getUsername(userData.username);
            console.log(`ini user data ${userData}`);
            
            if (existingUser) {
                throw apiError(400, "BAD_REQUEST","Username already exists");
            }
            const hashedPassword = await security.hashPassword(userData.password)
            const newUser = await userRepo.create({
                ...userData,
                password: hashedPassword
            })

            return {id:newUser.id, username:newUser.username}
        },

        async login(username, password){
            const user = await userRepo.getUsername(username)
            
            if (!user) {
                throw new Error("Wrong username");
            }

            const isMatch = await security.verifyPassword(password, user.password);
            if (!isMatch) {
                throw new Error("Wrong Password");
            }
            
            const token = {
                id: user.id,
                username: user.username,
                role: user.role
            }

            const accessToken = security.generateAccessToken(token)

            return {accessToken, user:{
                id:user.id,
                username:user.username
            }}
        }
    }
}

module.exports = createAuthService