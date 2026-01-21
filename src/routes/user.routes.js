const express = require('express')
const router = express.Router()

function createUserRoutes({userController}){
    router.get('/', userController.getUsers)
    router.get('/:id', userController.getById)
    router.post('/', userController.createNewUser)
    router.put('/:id', userController.updateUser)
    router.delete('/:id', userController.deleteUser)

    return router
}

module.exports = createUserRoutes