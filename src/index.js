require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const PORT = process.env.PORT
const cookieParser = require('cookie-parser')

const redisClient = require('./utils/redis')
const prisma = require('./db')

const checkRole = require('./middleware/authorization')
const createAuthMiddleware = require('./middleware/authentication')
const errorHandler = require('./utils/errorHandler')
const createSecurity = require('./utils/security')
//service
const createStockService = require('./services/stock.service')
const createProductService = require('./services/product.service')
const createCategoryService = require('./services/category.service')
const createAuthService = require('./services/auth.service')
const createUserService = require('./services/user.service')
//controller
const createStockController = require('./controller/stock.controller')
const createProductController = require('./controller/product.controller')
const createUserController = require('./controller/user.controller')
const createAuthController = require('./controller/auth.controller')
const createCategoryController = require('./controller/category.controller')
//routes
const stockRoutes = require('./routes/stock.routes')
const productRoutes = require('./routes/product.routes')
const categoryRoutes = require('./routes/category.routes')
const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')
//repository
const createStockRepository = require('./repository/stock.repository')
const createProductRepository = require('./repository/product.repository')
const createCategoryRepository = require('./repository/category.repository')
const createUserRepository = require('./repository/user.repository')

const security = createSecurity()
const authMiddleware = createAuthMiddleware({security})

const userRepo = createUserRepository({db:prisma})
const categoryRepo = createCategoryRepository({db:prisma})
const productRepo = createProductRepository({db:prisma})
const stockRepo = createStockRepository({db:prisma})

const productService = createProductService({productRepo, redisClient})
const stockService = createStockService({stockRepo, productRepo})
const userService = createUserService({userRepo})
const categoryService = createCategoryService({categoryRepo})
const authService = createAuthService({userRepo, security})

const productController = createProductController({productService})
const stockController = createStockController({stockService})
const userController = createUserController({userService})
const authController = createAuthController({authService})
const categoryController = createCategoryController({categoryService})
 
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use('/product', productRoutes({productController, authMiddleware, checkRole}))
app.use('/stock', stockRoutes({stockController, authMiddleware, checkRole}))
app.use('/auth', authRoutes({authController}))
app.use('/users', userRoutes({userController}))
app.use('/category', categoryRoutes({categoryController, authMiddleware, checkRole}))

app.get('/', (req, res)=>{
    res.json({
        message:"Hello"
    })
})

app.use(errorHandler);
module.exports = app

// app.listen(PORT, ()=>{
//     console.log(`Server listening to: ${PORT}`);
// })