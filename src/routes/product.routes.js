const express = require('express')
const checkData = require('../middleware/checkData')
const {createProductSchema, updateProductSchema} = require('../validation/validation.product')

function createProductRoutes({productController, authMiddleware, checkRole}){
    const router = express.Router();

    router.get('/', authMiddleware, productController.getProduct)
    router.get('/:id', authMiddleware, productController.getProductById)
    router.post('/', authMiddleware, checkRole(['admin', 'superadmin']), checkData(createProductSchema), productController.createNewProduct)
    router.put('/:id', authMiddleware, checkRole(['admin', 'superadmin']),checkData(updateProductSchema), productController.updateProduct)
    router.delete('/:id', authMiddleware, checkRole(['superadmin']), productController.deleteProduct)

    return router
}

module.exports = createProductRoutes