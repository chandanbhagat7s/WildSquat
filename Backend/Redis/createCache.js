const redisClient = require('./redisClient');


async function createCache(req, data) {
    // Set cache with expiration (e.g., 1 hour)
    try {


        await redisClient.set(req.cacheKey, JSON.stringify(data), {
            EX: 5 * 3600  // Cache expires in 5 hour
        });

    } catch (e) {
        return
    }
}

module.exports = createCache;
