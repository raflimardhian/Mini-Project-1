const express = require('express')
const router = express.Router()
const checkData =require('../middleware/checkData')
const {loginSchema, registerSchema} = require('../validation/validation.auth')

function createAuthRoutes({authController}){
    router.post('/register',checkData(registerSchema), authController.register)
    router.post('/login', checkData(loginSchema), authController.login)

    return router
}

module.exports = createAuthRoutes