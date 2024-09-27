const redisClient = require('./redisClient');
const generateCacheKey = (req) => {
    const baseUrl = req.originalUrl.split('?')[0];
    const queryString = JSON.stringify(req.query);  // Capture all query parameters
    return `${baseUrl}:${queryString}`;
};

async function createCache(req, data) {
    // Set cache with expiration (e.g., 1 hour)
    try {
        console.log("CREATENG CASCHE");

        const cacheKey = generateCacheKey(req);
        await redisClient.set(cacheKey, JSON.stringify(data), {
            EX: 5 * 3600  // Cache expires in 5 hour
        });

    } catch (e) {
        return
    }
}

module.exports = createCache;
