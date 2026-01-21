const apiError = require("../utils/apiError")

function createProductService({productRepo, redisClient}){
    const CACHE_ALL = "products:all"
    const CACHE_TTL = 60
    return{
        async getAll(query){
            const cacheKey =
                query && Object.keys(query).length > 0
                ? `products:list:${JSON.stringify(query)}`
                : "products:list";

            try{
                const cachedData = await redisClient.get(cacheKey)
                if(cachedData){
                    console.log("Cache Hit!");
                    return JSON.parse(cachedData);
                }
            } catch(err){
                console.log("Redis error", err);
                
            }
            console.log("Cache Miss - Fetching from DB", cacheKey);
            const product = await productRepo.findAll(query)
            try {
                await redisClient.set(cacheKey, JSON.stringify(product), {
                    EX: CACHE_TTL // Expire in 60 seconds
                });
            } catch (err) {
                console.error("Redis Save Error", err);
            }
            return product
        },

        async getById(id){
            const data = await productRepo.findById(id)
            if(!data) throw apiError(404, "NOT_FOUND", "Product not found", "Please insert valid id")
            return data
        },

        async create(data){
            const product = {...data}
            await redisClient.del(CACHE_ALL)
            return await productRepo.create(product)
        },

        async update(id, product, userId){
            const currentProduct = await productRepo.findById(id)
            if(!currentProduct) throw apiError(404, "NOT_FOUND", "Delete failed, product not found", "Please insert valid id")
            return await productRepo.update(id, product)
        },

        async delete(id){
            const deletedProduct = await productRepo.findById(id)
            if(!deletedProduct) throw apiError(404, "NOT_FOUND", "Delete failed, product not found")
            return await productRepo.delete(id)
        }
    }
}

module.exports = createProductService