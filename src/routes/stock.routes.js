const express = require('express')
const {createStockSchema} = require('../validation/validation.stock')
const checkData = require('../middleware/checkData')

function createStockRoutes({stockController, authMiddleware, checkRole}){
    const router = express.Router()

    router.get('/', authMiddleware, stockController.getStock)
    router.get('/:id', authMiddleware, checkRole(['admin', 'superadmin']), stockController.getStockById)
    router.post('/', authMiddleware, checkRole(['admin', 'superadmin']), checkData(createStockSchema), authMiddleware, stockController.createNewStock)
    router.put('/:id', authMiddleware, checkRole(['superadmin']), stockController.updateStock)
    router.delete('/', authMiddleware, checkRole(['superadmin']), stockController.deleteStock)

    return router
}

module.exports = createStockRoutes