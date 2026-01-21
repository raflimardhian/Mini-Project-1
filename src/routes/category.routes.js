const express = require('express')
const checkData = require('../middleware/checkData')
const {createCategorySchema, updateCategorySchema} = require('../validation/validation.category')

function createCategoryRoutes({ categoryController, authMiddleware, checkRole }) {
    const router = express.Router();

    router.get('/', categoryController.getCategory);
    router.get('/:id',authMiddleware, checkRole(['admin', 'superadmin']), categoryController.getCategoryById);
    router.post('/', authMiddleware, checkRole(['admin', 'superadmin']), checkData(createCategorySchema), categoryController.createNewCategory);
    router.put('/:id', authMiddleware, checkRole(['admin', 'superadmin']), checkData(updateCategorySchema), categoryController.updateCategory);
    router.delete('/:id', authMiddleware, checkRole('superadmin'), categoryController.deleteCategory);
    return router;
    
}

module.exports = createCategoryRoutes